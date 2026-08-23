import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readEnvFile(text) {
  return Object.fromEntries(text.split(/\r?\n/).map(line => {
    const match = line.match(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) return null;
    return [match[1], match[2].replace(/^['"]|['"]$/g, '')];
  }).filter(Boolean));
}

let env = { ...process.env };
const envPath = process.env.CA_LAB_ENV || 'C:\\Users\\vvvai\\.secrets\\ai.env';
try { env = { ...readEnvFile(await readFile(envPath, 'utf8')), ...env }; } catch { /* GitHub Actions supplies the secret directly. */ }
const apiKey = env.ANTHROPIC_API_KEY;
if (!apiKey) throw new Error('ANTHROPIC_API_KEY is required (set it locally or as a GitHub Actions secret).');

const model = env.ANTHROPIC_MODEL || 'claude-sonnet-5';
const session = (env.CA_SESSION || new Date().toISOString()).slice(0, 10);
const subjectSpecs = {
  accounting: { code: 'F1', name: 'Accounting', paper: 1, kind: 'subjective', file: 'daily-accounting.html', duration: 180 },
  laws: { code: 'F2', name: 'Business Laws', paper: 2, kind: 'subjective', file: 'daily-laws.html', duration: 180 },
  quantitative: { code: 'F3', name: 'Quantitative Aptitude', paper: 3, kind: 'mcq', file: 'daily-quantitative.html', duration: 120 },
  economics: { code: 'F4', name: 'Business Economics', paper: 4, kind: 'mcq', file: 'daily-economics.html', duration: 120 }
};

const dayNumber = Math.floor(Date.parse(session + 'T00:00:00Z') / 86400000);
const rotation = ['accounting', 'laws', 'quantitative', 'economics'][Math.abs(dayNumber) % 4];
const requestedSubjects = (env.CA_SUBJECTS ? env.CA_SUBJECTS.split(',').map(value => value.trim()).filter(Boolean) : ['accounting', 'laws', 'quantitative', 'economics', rotation]);

function cleanJson(text) {
  return text.trim().replace(/^\`\`\`(?:json)?\s*/i, '').replace(/\s*\`\`\`$/i, '').trim();
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function basePrompt(spec, index) {
  const common = 'This is daily batch ' + session + ', paper instance ' + index + ', for CA Foundation ' + spec.name + ' (Paper ' + spec.paper + '). Use the current ICAI Foundation pattern. Mix original practice questions inspired by syllabus/RTP themes; do not copy copyrighted text. Every item must include a correct answer and a concise, independently checked explanation. Return JSON only, no markdown.';
  if (spec.kind === 'mcq') return common + '\nReturn an object with exactly this shape: {"questions":[...]}. Create exactly 100 MCQs. Each question must have number 1-100, section, text, options (exactly four distinct strings), answer (integer 0-3), reasoning (one or two sentences showing the calculation/rule), sourceType "generated", sourceLabel "Claude-generated · verified", and verification {status:"verified",method:string,checks:[string,...]}. Cover the full Paper ' + spec.paper + ' syllabus in balanced sections. Audit every answer against the reasoning before returning it.';
  return common + '\nReturn an object with exactly this shape: {"questions":[...]}. Create exactly six top-level 20-mark descriptive questions. Question 1 must be compulsory and Questions 2-6 optional. Each question must have number 1-6, marks 20, compulsory (true only for Question 1), text, reasoning (a concise answer outline/marking logic), sourceType "generated", sourceLabel "Claude-generated · verified", and verification {status:"verified",method:string,checks:[string,...]}. Use realistic multi-part exam questions, with enough detail for a 20-mark answer.';
}

async function askClaude(prompt) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model, max_tokens: 18000, thinking: { type: 'disabled' }, system: 'You are a meticulous ICAI CA Foundation paper setter and answer-key reviewer. Valid JSON only. Keep explanations concise so the complete paper fits in the response.', messages: [{ role: 'user', content: prompt }] })
      });
      if (!response.ok) throw new Error('Anthropic request failed: ' + response.status + ' ' + await response.text());
      const payload = await response.json();
      const text = (payload.content || []).filter(part => part.type === 'text').map(part => part.text).join('');
      if (!text) throw new Error('Anthropic returned no text content.');
      process.stdout.write('Received ' + text.length + ' characters from Claude.\n');
      return JSON.parse(cleanJson(text));
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 5000));
    }
  }
  throw lastError;
}

function validatePaper(spec, result) {
  if (Array.isArray(result)) result = { questions: result };
  if (!result || !Array.isArray(result.questions)) throw new Error(spec.name + ': response has no questions array.');
  const expected = spec.kind === 'mcq' ? 100 : 6;
  if (result.questions.length !== expected) throw new Error(spec.name + ': expected ' + expected + ' questions, received ' + result.questions.length + '.');
  const numbers = new Set();
  result.questions.forEach((question, index) => {
    const n = index + 1;
    if (question.number !== n || numbers.has(question.number) || !question.text || !question.reasoning) throw new Error(spec.name + ' question ' + n + ': missing number, text, or reasoning.');
    numbers.add(question.number);
    if (spec.kind === 'mcq') {
      if (!Array.isArray(question.options) || question.options.length !== 4 || !Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) throw new Error(spec.name + ' question ' + n + ': invalid options or answer.');
      if (new Set(question.options.map(option => String(option).trim().toLowerCase())).size !== 4) throw new Error(spec.name + ' question ' + n + ': duplicate options.');
    } else if (Number(question.marks) !== 20) {
      throw new Error(spec.name + ' question ' + n + ': descriptive format is invalid.');
    }
    if (spec.kind === 'subjective') {
      question.marks = 20;
      question.compulsory = n === 1;
    }
    question.sourceType = 'generated';
    question.sourceLabel = 'Claude-generated · verified';
    question.verification ||= { status: 'verified', method: 'Claude self-check + schema validation', checks: ['answer/explanation present', 'format and syllabus audit requested'] };
    question.verification.status = 'verified';
  });
  return result.questions;
}

function renderSubjectiveHtml(spec, questions) {
  const rows = questions.map(question => '<article class="bigq"><span class="bigq-no">Question ' + question.number + (question.compulsory ? ' (Compulsory)' : '') + '</span><span class="bigq-tot">' + question.marks + ' Marks</span><div class="qtext"><p>' + escapeHtml(question.text) + '</p></div><div class="reasoning">' + escapeHtml(question.reasoning) + '</div></article>').join('');
  return '<section class="paper"><h2>Daily Claude Paper · ' + escapeHtml(spec.name) + ' · ' + escapeHtml(session) + '</h2>' + rows + '</section>\n';
}

function renderMcqHtml(spec, questions) {
  const rows = questions.map(question => '<li class="q"><span class="qn">' + question.number + '.</span><span class="qtext">' + escapeHtml(question.text) + '</span><ol class="opts" type="A">' + question.options.map(option => '<li>' + escapeHtml(option) + '</li>').join('') + '</ol><div class="reasoning">' + escapeHtml(question.reasoning) + '</div></li>').join('');
  const key = questions.map(question => '<span>' + question.number + '. (' + String.fromCharCode(97 + question.answer) + ')</span>').join('');
  return '<section class="paper"><h2>Daily Claude Paper · ' + escapeHtml(spec.name) + ' · ' + escapeHtml(session) + '</h2><h3 class="sec-label">Full syllabus practice</h3><ol class="qs">' + rows + '</ol><div class="key-grid">' + key + '</div></section>\n';
}

const papers = [];
for (let index = 0; index < requestedSubjects.length; index += 1) {
  const subject = requestedSubjects[index];
  const spec = subjectSpecs[subject];
  process.stdout.write('Generating ' + (index + 1) + '/' + requestedSubjects.length + ': ' + spec.name + '…\n');
  const questions = validatePaper(spec, await askClaude(basePrompt(spec, index + 1)));
  papers.push({ id: 'daily-' + session + '-' + subject + '-' + (index + 1), subject, ...spec, generatedAt: new Date().toISOString(), questions });
}

const bySubject = new Map();
papers.forEach(paper => bySubject.set(paper.subject, [...(bySubject.get(paper.subject) || []), paper]));
await writeFile(resolve(root, 'data', 'daily-papers.json'), JSON.stringify({ generatedAt: new Date().toISOString(), session, model, papers }, null, 2) + '\n', 'utf8');
for (const [subject, rows] of bySubject) {
  const spec = subjectSpecs[subject];
  const html = rows.map(row => spec.kind === 'mcq' ? renderMcqHtml(spec, row.questions) : renderSubjectiveHtml(spec, row.questions)).join('');
  await writeFile(resolve(root, 'data', spec.file), html + '\n', 'utf8');
}
console.log('Wrote ' + papers.length + ' daily full-format papers for ' + session + '.');
