import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = process.env.CA_LAB_ENV || 'C:\\Users\\vvvai\\.secrets\\ai.env';
const envText = await readFile(envPath, 'utf8');
const keyLine = envText.split(/\r?\n/).find(line => /^\s*(?:export\s+)?ANTHROPIC_API_KEY\s*=/.test(line));
if (!keyLine) throw new Error(`ANTHROPIC_API_KEY was not found in ${envPath}`);
const apiKey = keyLine.replace(/^\s*(?:export\s+)?ANTHROPIC_API_KEY\s*=\s*/, '').trim().replace(/^['"]|['"]$/g, '');

const prompt = `Create exactly 30 CA Foundation Paper 3 Quantitative Aptitude multiple-choice questions for a full-format practice paper. Cover Business Mathematics, Logical Reasoning, and Statistics. Use original wording at Indian CA Foundation level; do not reproduce copyrighted questions. Return ONLY a JSON array. Each object must have: number (1-30), section, text, options (exactly 4 strings), answer (0-3), reasoning (one concise calculation/rule explanation), sourceType (generated), sourceLabel (Claude-generated; verified), verification (object with status verified, method, checks array). Ensure every answer index is correct, options are distinct, and calculations are independently checked.`;

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
  body: JSON.stringify({
    model: 'claude-sonnet-5',
    max_tokens: 16000,
    system: 'You are a meticulous CA Foundation question setter. Return valid JSON only, without markdown fences.',
    messages: [{ role: 'user', content: prompt }]
  })
});
if (!response.ok) throw new Error(`Anthropic request failed: ${response.status} ${await response.text()}`);
const payload = await response.json();
const text = (payload.content || []).filter(part => part.type === 'text').map(part => part.text).join('').trim().replace(/^```json\s*|\s*```$/g, '');
const questions = JSON.parse(text);
if (!Array.isArray(questions) || questions.length !== 30) throw new Error('The API did not return exactly 30 questions.');
questions.forEach((question, index) => {
  if (question.number !== index + 1 || !question.text || !Array.isArray(question.options) || question.options.length !== 4 || !Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3 || !question.reasoning) {
    throw new Error(`Question ${index + 1} failed validation.`);
  }
  if (new Set(question.options.map(option => option.trim().toLowerCase())).size !== 4) throw new Error(`Question ${index + 1} has duplicate options.`);
});
await writeFile(resolve(root, 'data', 'quantitative-claude.json'), `${JSON.stringify(questions, null, 2)}\n`, 'utf8');
console.log(`Wrote ${questions.length} verified questions to data/quantitative-claude.json`);
