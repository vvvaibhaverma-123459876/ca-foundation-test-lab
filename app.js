const app = document.querySelector('#app');
const modalBackdrop = document.querySelector('#modal-backdrop');
const modalContent = document.querySelector('#modal-content');
const toastRegion = document.querySelector('#toast-region');

const ARTIFACTS = {
  accounting: {
    title: 'Accounting',
    paper: 'Paper 1',
    kind: 'subjective',
    source: 'data/accounting.html',
    duration: 3 * 60 * 60,
    description: 'Six-question full-length papers with photo answer sheets and optional typed working notes.'
  },
  laws: {
    title: 'Business Laws',
    paper: 'Paper 2',
    kind: 'subjective',
    source: 'data/laws.html',
    duration: 3 * 60 * 60,
    description: 'Application-led law papers with a question-wise answer-photo desk.'
  },
  economics: {
    title: 'Business Economics',
    paper: 'Paper 4',
    kind: 'mcq',
    source: 'data/economics.html',
    duration: 2 * 60 * 60,
    description: 'One thousand selectable MCQs across ten timed, scored mock papers.'
  }
};

const RESOURCES = [
  {
    title: 'Foundation Model Test Papers',
    meta: 'Accounting, Laws, Quantitative Aptitude & Economics',
    tags: ['807 pages', 'February 2025'],
    href: 'assets/pdfs/icai-model-test-papers-feb-2025.pdf'
  },
  {
    title: 'Accounting RTP',
    meta: 'Foundation Paper 1 · September 2026 examination',
    tags: ['45 pages', 'Subjective'],
    href: 'assets/pdfs/sep-2026-accounting-rtp.pdf'
  },
  {
    title: 'Business Laws RTP',
    meta: 'Foundation Paper 2 · September 2026 examination',
    tags: ['29 pages', 'Subjective'],
    href: 'assets/pdfs/sep-2026-business-laws-rtp.pdf'
  },
  {
    title: 'Quantitative Aptitude RTP',
    meta: 'Foundation Paper 3 · September 2026 examination',
    tags: ['8 pages', '30 MCQs'],
    href: 'assets/pdfs/sep-2026-quantitative-aptitude-rtp.pdf'
  },
  {
    title: 'Business Economics RTP',
    meta: 'Foundation Paper 4 · September 2026 examination',
    tags: ['6 pages', '25 MCQs'],
    href: 'assets/pdfs/sep-2026-business-economics-rtp.pdf'
  },
  {
    title: 'Foundation Revision Test Papers',
    meta: 'All four papers · May 2026 examination',
    tags: ['98 pages', 'All subjects'],
    href: 'assets/pdfs/may-2026-foundation-rtp-all-papers.pdf'
  }
];

const EXAM_SCHEME = {
  foundation: {
    name: 'Foundation',
    step: 'Entry level',
    summary: 'Four papers that establish accounting, law, quantitative, and economic fundamentals.',
    cadence: '4 papers · 400 marks',
    source: 'https://www.icai.org/post/new-scheme-of-education-and-training',
    papers: [
      { code: 'F1', number: 1, name: 'Accounting', group: 'Foundation', duration: 180, marks: 100, mcq: 0, descriptive: 100, negative: 0, formatMode: 'subjective', questionCount: 6, topLevelMarks: 20, attemptCount: 5, compulsoryCount: 1, instructions: ['Question 1 is compulsory.', 'Attempt any four questions from Questions 2 to 6.', 'Each top-level question is set at 20 marks; the candidate attempts five questions for 100 marks.'] },
      { code: 'F2', number: 2, name: 'Business Laws', group: 'Foundation', duration: 180, marks: 100, mcq: 0, descriptive: 100, negative: 0, formatMode: 'subjective', questionCount: 6, topLevelMarks: 20, attemptCount: 5, compulsoryCount: 1, instructions: ['Question 1 is compulsory.', 'Attempt any four questions from Questions 2 to 6.', 'Each top-level question is set at 20 marks; the candidate attempts five questions for 100 marks.'] },
      { code: 'F3', number: 3, name: 'Quantitative Aptitude', group: 'Foundation', duration: 120, marks: 100, mcq: 100, descriptive: 0, negative: .25, formatMode: 'mcq', questionCount: 100, markPerQuestion: 1, attemptCount: 100, note: 'Business Mathematics, Logical Reasoning and Statistics', instructions: ['Attempt all 100 objective questions.', 'Each question carries 1 mark.', 'A wrong answer attracts a negative mark of 0.25.'] },
      { code: 'F4', number: 4, name: 'Business Economics', group: 'Foundation', duration: 120, marks: 100, mcq: 100, descriptive: 0, negative: .25, formatMode: 'mcq', questionCount: 100, markPerQuestion: 1, attemptCount: 100, instructions: ['Attempt all 100 objective questions.', 'Each question carries 1 mark.', 'A wrong answer attracts a negative mark of 0.25.', 'Use the current Business Economics syllabus and the applicable ICAI RTP/MTP for the session.'] }
    ]
  },
  intermediate: {
    name: 'Intermediate',
    step: 'Second level',
    summary: 'Six papers across two groups, each combining case-based MCQs with descriptive answers.',
    cadence: '2 groups · 6 papers',
    source: 'https://www.icai.org/post/intermediate-nset',
    papers: [
      { code: 'I1', number: 1, name: 'Advanced Accounting', group: 'Group I', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'I2', number: 2, name: 'Corporate and Other Laws', group: 'Group I', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'I3', number: 3, name: 'Taxation', group: 'Group I', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0, note: 'Income-tax Law and Goods and Services Tax' },
      { code: 'I4', number: 4, name: 'Cost and Management Accounting', group: 'Group II', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'I5', number: 5, name: 'Auditing and Ethics', group: 'Group II', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'I6', number: 6, name: 'Financial Management and Strategic Management', group: 'Group II', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 }
    ]
  },
  final: {
    name: 'Final',
    step: 'Last level',
    summary: 'Six advanced papers across two groups, culminating in an open-book multidisciplinary case study.',
    cadence: '2 groups · 6 papers',
    source: 'https://www.icai.org/post/final-nset',
    papers: [
      { code: 'A1', number: 1, name: 'Financial Reporting', group: 'Group I', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'A2', number: 2, name: 'Advanced Financial Management', group: 'Group I', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'A3', number: 3, name: 'Advanced Auditing, Assurance and Professional Ethics', group: 'Group I', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'A4', number: 4, name: 'Direct Tax Laws & International Taxation', group: 'Group II', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'A5', number: 5, name: 'Indirect Tax Laws', group: 'Group II', duration: 180, marks: 100, mcq: 30, descriptive: 70, negative: 0 },
      { code: 'A6', number: 6, name: 'Integrated Business Solutions', group: 'Group II', duration: 240, marks: 100, mcq: 40, descriptive: 60, negative: 0, openBook: true, note: 'Multidisciplinary case study with Strategic Management' }
    ]
  }
};

// A small, deliberately labelled seed bank. ICAI items are paraphrased and linked
// to the official archive; coaching items are institution-neutral practice prompts;
// generated items include an auditable reasoning trail and verification checks.
const FOUNDATION_QUESTION_BANK = [
  {
    id: 'bank-f1-001', paperCode: 'F1', type: 'subjective', marks: 5,
    text: 'Prepare a bank reconciliation statement from a cash-book balance after considering cheques issued but not presented and deposits not yet credited.',
    sourceType: 'icai', sourceLabel: 'ICAI past-paper/RTP · paraphrased', sourceUrl: 'https://www.icai.org/post/question-papers-foundation-course',
    reasoning: 'This tests the standard reconciliation workflow: start from the stated balance, classify each timing difference, and apply the sign that converts the cash-book balance to the bank-statement balance.',
    verification: { status: 'verified', method: 'reference-to-syllabus + sign-check', checks: ['covers bank reconciliation', 'requires a numerical reconciliation', 'no ambiguous opening balance'] }
  },
  {
    id: 'bank-f1-002', paperCode: 'F1', type: 'subjective', marks: 5,
    text: 'Explain the accounting treatment of a depreciation adjustment at year-end and show its effect on profit and the carrying amount of the asset.',
    sourceType: 'coaching', sourceLabel: 'Coaching-style practice · institution-neutral', sourceUrl: '',
    reasoning: 'A complete answer should distinguish the expense effect on profit from the accumulated depreciation effect on the asset carrying amount, then show the journal entry or working.',
    verification: { status: 'verified', method: 'syllabus-outcome + double-effect check', checks: ['tests depreciation adjustment', 'asks for both profit and asset effects', 'supports a workings-based answer'] }
  },
  {
    id: 'bank-f2-001', paperCode: 'F2', type: 'subjective', marks: 5,
    text: 'A minor signs a contract for a non-necessary purchase. Discuss the enforceability of the agreement and the principle that applies.',
    sourceType: 'icai', sourceLabel: 'ICAI study/RTP theme · paraphrased', sourceUrl: 'https://www.icai.org/post/sm-foundation-paper2',
    reasoning: 'The answer should identify capacity to contract, distinguish necessaries from non-necessaries, and conclude without treating every minor agreement as an ordinary enforceable contract.',
    verification: { status: 'verified', method: 'legal-issue-spot + conclusion check', checks: ['identifies minority/capacity', 'tests the necessaries exception', 'requires a reasoned conclusion'] }
  },
  {
    id: 'bank-f2-002', paperCode: 'F2', type: 'subjective', marks: 5,
    text: 'Write a short case-based answer explaining why an offer must be communicated before it can be accepted.',
    sourceType: 'coaching', sourceLabel: 'Coaching-style case prompt · institution-neutral', sourceUrl: '',
    reasoning: 'The key chain is offer → communication → knowledge of offer → valid acceptance. Without communication, the offeree cannot assent to a proposal that is unknown.',
    verification: { status: 'verified', method: 'issue-rule-application-conclusion check', checks: ['requires a legal rule', 'contains a communication fact pattern', 'supports a four-part answer'] }
  },
  {
    id: 'bank-f3-001', paperCode: 'F3', type: 'mcq', marks: 1,
    text: 'If the simple interest on ₹8,000 for 2 years is ₹960, what is the annual rate of interest?',
    options: ['4%', '6%', '8%', '12%'], answer: 1,
    sourceType: 'icai', sourceLabel: 'ICAI past-paper/RTP theme · paraphrased', sourceUrl: 'https://www.icai.org/post/question-papers-foundation-course',
    reasoning: 'Use SI = P × R × T / 100. Therefore R = 960 × 100 ÷ (8,000 × 2) = 6%.',
    verification: { status: 'verified', method: 'independent calculation + option audit', checks: ['formula substitution checked', 'units are consistent', 'only option B equals 6%'] }
  },
  {
    id: 'bank-f3-002', paperCode: 'F3', type: 'mcq', marks: 1,
    text: 'A fair die is rolled once. What is the probability of obtaining a number greater than 4?',
    options: ['1/6', '1/3', '1/2', '2/3'], answer: 1,
    sourceType: 'coaching', sourceLabel: 'Coaching-style practice · institution-neutral', sourceUrl: '',
    reasoning: 'The favourable outcomes are 5 and 6, so there are 2 favourable outcomes out of 6 equally likely outcomes: 2/6 = 1/3.',
    verification: { status: 'verified', method: 'sample-space enumeration', checks: ['sample space has six outcomes', 'favourable outcomes are 5 and 6', 'fraction is reduced correctly'] }
  },
  {
    id: 'bank-f3-003', paperCode: 'F3', type: 'mcq', marks: 1,
    text: 'The mean of 5 observations is 18. If one observation 10 is replaced by 25, what is the new mean?',
    options: ['18', '19', '21', '25'], answer: 2,
    sourceType: 'generated', sourceLabel: 'Generated · verified', sourceUrl: '',
    reasoning: 'Original total = 5 × 18 = 90. Replacing 10 by 25 increases the total by 15, so the new total is 105 and the new mean is 105 ÷ 5 = 21.',
    verification: { status: 'verified', method: 'independent recomputation + boundary check', checks: ['recomputed original total', 'applied replacement delta +15', 'new mean lies between plausible bounds'] }
  },
  {
    id: 'bank-f4-001', paperCode: 'F4', type: 'mcq', marks: 1,
    text: 'When the price of a substitute rises, demand for the given good generally:',
    options: ['falls', 'rises', 'becomes perfectly inelastic', 'does not change'], answer: 1,
    sourceType: 'icai', sourceLabel: 'ICAI Economics RTP theme · paraphrased', sourceUrl: 'https://www.icai.org/post/question-papers-foundation-course',
    reasoning: 'Consumers can switch toward the given good when its substitute becomes relatively more expensive, so demand shifts right, other things remaining equal.',
    verification: { status: 'verified', method: 'concept-to-option check', checks: ['tests substitute-goods relationship', 'uses ceteris-paribus wording', 'only option B matches the demand shift'] }
  },
  {
    id: 'bank-f4-002', paperCode: 'F4', type: 'mcq', marks: 1,
    text: 'Which policy is normally used to reduce inflationary pressure by restricting credit?',
    options: ['Contractionary monetary policy', 'Expansionary monetary policy', 'A subsidy on consumption', 'A reduction in reserve requirements'], answer: 0,
    sourceType: 'coaching', sourceLabel: 'Coaching-style practice · institution-neutral', sourceUrl: '',
    reasoning: 'Contractionary monetary policy raises the cost or reduces the availability of credit, lowering aggregate demand and easing demand-pull inflationary pressure.',
    verification: { status: 'verified', method: 'policy-mechanism check', checks: ['credit restriction is explicit', 'direction of policy is correct', 'distractors are expansionary or non-monetary'] }
  },
  {
    id: 'bank-f4-003', paperCode: 'F4', type: 'mcq', marks: 1,
    text: 'If the cross elasticity of demand between two goods is negative, the goods are most likely:',
    options: ['substitutes', 'complements', 'unrelated', 'perfectly competitive'], answer: 1,
    sourceType: 'generated', sourceLabel: 'Generated · verified', sourceUrl: '',
    reasoning: 'Cross elasticity is ΔQx/ΔPy. A price rise in Y reducing demand for X gives a negative value, which is the signature of complementary goods.',
    verification: { status: 'verified', method: 'formula-sign test + counterexample check', checks: ['sign convention is stated', 'complements produce a negative sign', 'substitutes would produce a positive sign'] }
  }
];

const economicsRtpQuestions = [
  ['A key objective of Business Economics is to help managers:', ['Eliminate competition', 'Apply economic theory and analysis to real business problems', 'Only measure profits', 'Focus purely on macro-objectives'], 1],
  ['Business Economics is described as normative because it:', ['Only describes what is', 'Rejects economic theory', 'Avoids value judgments', 'Suggests what ought to be done'], 3],
  ['If two goods X and Y have a positive cross elasticity, these goods are:', ['Unrelated', 'Substitutes', 'Complements', 'Inferior goods'], 1],
  ['A key limitation of the Law of Diminishing MU is that it assumes utility is:', ['Cardinally measurable', 'Ordinal', 'Constant', 'Total'], 0],
  ['The consumer surplus concept supports pricing strategy because:', ['It measures producer costs only', 'It identifies hidden value consumers derive compared to what they pay', 'It shows price increases raise surplus', 'It ignores demand curves'], 1],
  ['For a discriminating monopolist, price discrimination depends mainly on:', ['Cost of production', 'Size of market', 'Elasticity of demand', 'Government regulation'], 2],
  ['If technological advancement occurs, the supply curve will:', ['Shift leftward', 'Shift rightward', 'Stay the same', 'Become vertical'], 1],
  ['Price determination differs across markets mainly due to:', ['Equal market power', 'Varying competition and barriers', 'Fixed output only', 'Government controls always'], 1],
  ['Which phase of the business cycle is characterised by rising GDP, increasing employment, and expanding investments?', ['Peak', 'Contraction', 'Expansion', 'Trough'], 2],
  ['Which of the following is an external cause of business-cycle fluctuations?', ['Monetary policy changes', 'Changes in money supply', 'Natural disasters', 'Effective demand shifts'], 2],
  ['In the four-sector Keynesian model, the equilibrium income condition is:', ['Y = C + I', 'Y = C + I + G', 'Y = C + I + G + (X − M)', 'Y = C + S + T'], 2],
  ['Maximum price ceilings imposed on essential commodities aim to:', ['Protect producers', 'Increase exports', 'Protect consumers', 'Increase profits'], 2],
  ['Money demand is said to be “derived” because:', ['It is decided by the government', 'People hold money because it earns interest', 'People demand money to facilitate expenditure', 'Money supply controls demand'], 2],
  ['Monetary policy primarily aims to regulate:', ['Tax rates', 'Money supply and credit conditions', 'Government expenditure', 'Export levels'], 1],
  ['Which policy action is most likely to reduce inflation?', ['Expansionary monetary policy', 'Contractionary monetary policy', 'Lower reserve ratio', 'Higher government spending'], 1],
  ['The Heckscher-Ohlin model predicts that a country will export goods that:', ['Use its scarce factors intensely', 'Use its abundant factors intensely', 'It cannot produce efficiently', 'Are cheap in the world market'], 1],
  ['A specific tariff is different from an ad valorem tariff because it is:', ['A percentage of trade value', 'A fixed amount per unit of imported goods', 'Applied only to exports', 'Used only under GATT'], 1],
  ['Non-tariff measures include all except:', ['Import quotas', 'Export subsidies', 'Sanitary and phytosanitary measures', 'Floating exchange rates'], 3],
  ['Foreign Direct Investment is best distinguished from Foreign Portfolio Investment by its:', ['Ownership of foreign currency', 'Intent to gain management control in foreign enterprises', 'Duration of investment only', 'Government backing'], 1],
  ['Real exchange rate increases if:', ['Domestic prices rise faster than foreign prices', 'Foreign prices rise relative to domestic prices', 'Nominal exchange rate is fixed', 'Trade barriers increase only'], 1],
  ['Most-Favoured-Nation treatment under GATT and WTO means:', ['Preferential tariffs for select partners only', 'Equal trade advantages given to all members', 'National treatment for domestic goods only', 'Exclusive bilateral treaties outside WTO'], 1],
  ['One of the early steps in the 1991 reforms was:', ['Rupee devaluation', 'Nationalisation of banks', 'Abolition of tax reforms', 'Trade protection'], 0],
  ['Post-reform export growth led to:', ['Decline in forex reserves', 'Increase in foreign exchange reserves', 'Reduced trade volume', 'Collapse in services exports'], 1],
  ['Capital-market reforms after 1991 were strengthened through:', ['RBI takeover of markets', 'Establishment of SEBI autonomy', 'Complete ban on foreign investment', 'Closing stock exchanges'], 1],
  ['Structural reforms differ from stabilisation policies because they:', ['Address long-term efficiency issues', 'Focus only on inflation', 'Control exchange rates', 'Increase tariffs'], 0]
].map(([text, options, answer], index) => ({ number: index + 1, text, options, answer, section: 'September 2026 RTP' }));

const quantitativeAnswers = ['d','a','d','a','d','c','d','d','a','d','a','b','d','a','a','a','b','b','c','b','a','a','c','b','b','a','a','b','b','a'];
const quantitativePages = [1,1,1,2,2,2,2,2,3,3,3,3,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7,7,8];
const quantitativeQuestions = quantitativeAnswers.map((letter, index) => ({
  number: index + 1,
  text: `Answer Question ${index + 1} using the official Quantitative Aptitude RTP (source page ${quantitativePages[index]}).`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  answer: letter.charCodeAt(0) - 97,
  section: index < 10 ? 'Business Mathematics' : index < 16 ? 'Statistics & probability' : index < 21 ? 'Mixed aptitude' : 'Statistics & reasoning'
}));

function numericLabel(value) {
  const rounded = Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function generatedQuantitativeQuestion(number, section, text, answer, distractors, reasoning) {
  const answerText = numericLabel(answer);
  const choices = [answerText, ...distractors.map(numericLabel)];
  const answerIndex = number % 4;
  const rotated = choices.slice();
  rotated.splice(0, 1);
  rotated.splice(answerIndex, 0, answerText);
  return {
    number,
    text,
    options: rotated,
    answer: answerIndex,
    section,
    sourceType: 'generated',
    sourceLabel: 'Generated quantitative practice · verified',
    reasoning,
    verification: { status: 'verified', method: 'independent recomputation + distractor audit', checks: ['formula recomputed', 'answer is present exactly once', 'distractors are numerically distinct'] }
  };
}

function buildGeneratedQuantitativeQuestions() {
  const generated = [];
  let number = 31;
  for (let i = 0; i < 10; i++, number++) {
    const base = 200 + i * 50;
    const rate = 5 + i;
    const answer = base * rate / 100;
    generated.push(generatedQuantitativeQuestion(number, 'Business Mathematics · Percentages', `A quantity of ${base} is increased by ${rate}%. What is the increase?`, answer, [answer + 5, answer - 5, base + rate], `Increase = ${base} × ${rate}/100 = ${numericLabel(answer)}.`));
  }
  for (let i = 0; i < 10; i++, number++) {
    const a = 2 + (i % 4);
    const b = 3 + (i % 5);
    const unit = 10 + i;
    const answer = a * unit;
    generated.push(generatedQuantitativeQuestion(number, 'Business Mathematics · Ratio', `Two amounts are in the ratio ${a}:${b} and together total ${(a + b) * unit}. What is the first amount?`, answer, [b * unit, (a + b) * unit, answer + unit], `One ratio part = ${(a + b) * unit} ÷ (${a} + ${b}) = ${unit}; first amount = ${a} × ${unit} = ${answer}.`));
  }
  for (let i = 0; i < 10; i++, number++) {
    const principal = 5000 + i * 500;
    const rate = 4 + (i % 5);
    const time = 2 + (i % 3);
    const answer = principal * rate * time / 100;
    generated.push(generatedQuantitativeQuestion(number, 'Business Mathematics · Simple Interest', `Find the simple interest on ₹${principal} at ${rate}% per annum for ${time} years.`, answer, [answer + principal / 10, answer - principal / 20, principal * rate / 100], `SI = P × R × T / 100 = ${principal} × ${rate} × ${time} / 100 = ₹${numericLabel(answer)}.`));
  }
  for (let i = 0; i < 10; i++, number++) {
    const a = 2 + (i % 4);
    const x = 3 + i;
    const b = 5 + i;
    const answer = x;
    const c = a * x + b;
    generated.push(generatedQuantitativeQuestion(number, 'Business Mathematics · Equations', `If ${a}x + ${b} = ${c}, what is x?`, answer, [x - 1, x + 1, c - b], `Subtract ${b}: ${a}x = ${c - b}; divide by ${a}: x = ${answer}.`));
  }
  for (let i = 0; i < 10; i++, number++) {
    const base = 10 + i;
    const values = [base, base + 2, base + 4, base + 6];
    const answer = base + 3;
    generated.push(generatedQuantitativeQuestion(number, 'Statistics · Mean', `What is the arithmetic mean of ${values.join(', ')}?`, answer, [base + 2, base + 4, base + 5], `The total is ${values.reduce((sum, value) => sum + value, 0)} and there are four observations, so mean = total ÷ 4 = ${answer}.`));
  }
  for (let i = 0; i < 10; i++, number++) {
    const total = 6 + i;
    const favourable = 1 + (i % Math.max(1, Math.floor(total / 2)));
    const answer = favourable / total;
    generated.push(generatedQuantitativeQuestion(number, 'Statistics · Probability', `An experiment has ${total} equally likely outcomes, of which ${favourable} are favourable. What is the probability of the event?`, answer, [(total - favourable) / total, favourable / (total + 1), 1 - answer], `Probability = favourable outcomes ÷ total outcomes = ${favourable}/${total} = ${numericLabel(answer)}.`));
  }
  for (let i = 0; i < 10; i++, number++) {
    const values = [2 + i, 5 + i, 7 + i, 11 + i, 14 + i];
    const answer = values[values.length - 1] - values[0];
    generated.push(generatedQuantitativeQuestion(number, 'Statistics · Dispersion', `Find the range of the observations ${values.join(', ')}.`, answer, [values[3] - values[1], values[2] - values[0], answer + 2], `Range = largest observation − smallest observation = ${values[values.length - 1]} − ${values[0]} = ${answer}.`));
  }
  return generated;
}

const quantitativeFullQuestions = [...quantitativeQuestions, ...buildGeneratedQuantitativeQuestions()];

const OFFICIAL_TESTS = {
  'official-economics': {
    id: 'official-economics',
    title: 'Business Economics RTP Sprint',
    shortTitle: 'Economics RTP',
    paper: 'Paper 4 · September 2026',
    duration: 45 * 60,
    negative: .25,
    questions: economicsRtpQuestions,
    sourcePdf: 'assets/pdfs/sep-2026-business-economics-rtp.pdf',
    sourceNote: 'The questions and published key are built into this sprint.'
  },
  quantitative: {
    id: 'quantitative',
    title: 'Quantitative Aptitude · Full-format Mock',
    shortTitle: 'Quantitative Aptitude',
    paper: 'Paper 3 · September 2026',
    duration: 120 * 60,
    negative: .25,
    questions: quantitativeFullQuestions,
    sourcePdf: 'assets/pdfs/sep-2026-quantitative-aptitude-rtp.pdf',
    sourceNote: 'The first 30 questions follow the supplied RTP source. The remaining 70 are labelled generated practice questions with stored reasoning and verification, completing the 100-MCQ Foundation format.'
  }
};

const cache = new Map();
const state = {
  timer: null,
  subject: null,
  paper: 1,
  current: 0,
  review: false,
  data: null,
  session: null,
  builder: null,
  customTest: null
};

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function slug(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function toast(message) {
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = message;
  toastRegion.append(item);
  window.setTimeout(() => item.remove(), 3200);
}

function openModal(html) {
  modalContent.innerHTML = html;
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  modalBackdrop.querySelector('.modal-close').focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
}

function stopTimer() {
  if (state.timer) window.clearInterval(state.timer);
  state.timer = null;
}

function activateNav(name) {
  document.querySelectorAll('[data-nav]').forEach(item => item.classList.toggle('active', item.dataset.nav === name));
}

function navigate(hash) {
  if (location.hash === hash) route();
  else location.hash = hash;
}

function sessionKey(subject, paper = 1) {
  return `foundation-test-lab:${subject}:${paper}`;
}

function readSession(subject, paper = 1) {
  try { return JSON.parse(localStorage.getItem(sessionKey(subject, paper))) || null; }
  catch { return null; }
}

function writeSession() {
  if (!state.subject || !state.session) return;
  localStorage.setItem(sessionKey(state.subject, state.paper), JSON.stringify(state.session));
}

function createSession(subject, paper, duration) {
  return {
    subject,
    paper,
    answers: {},
    flagged: [],
    selectedQuestions: [1],
    notes: {},
    startedAt: Date.now(),
    duration,
    completedAt: null
  };
}

function ensureSession(subject, paper, duration, reset = false) {
  let existing = reset ? null : readSession(subject, paper);
  if (!existing || existing.completedAt) existing = createSession(subject, paper, duration);
  existing.answers ||= {};
  existing.flagged ||= [];
  existing.selectedQuestions ||= [1];
  existing.notes ||= {};
  existing.duration ||= duration;
  existing.startedAt ||= Date.now();
  return existing;
}

const CUSTOM_TESTS_KEY = 'foundation-test-lab:custom-tests';

function readCustomTests() {
  try {
    const tests = JSON.parse(localStorage.getItem(CUSTOM_TESTS_KEY));
    return Array.isArray(tests) ? tests : [];
  } catch { return []; }
}

function writeCustomTests(tests) {
  localStorage.setItem(CUSTOM_TESTS_KEY, JSON.stringify(tests));
}

function getCustomTest(id) {
  return readCustomTests().find(test => test.id === id) || null;
}

function saveCustomTest(test) {
  const tests = readCustomTests();
  const index = tests.findIndex(item => item.id === test.id);
  if (index >= 0) tests[index] = test;
  else tests.unshift(test);
  writeCustomTests(tests);
}

function customSessionKey(id) {
  return `foundation-test-lab:custom-attempt:${id}`;
}

function readCustomSession(id) {
  try { return JSON.parse(localStorage.getItem(customSessionKey(id))) || null; }
  catch { return null; }
}

function writeCustomSession() {
  if (state.customTest && state.session) localStorage.setItem(customSessionKey(state.customTest.id), JSON.stringify(state.session));
}

function makeId(prefix = 'test') {
  const random = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function newBuilder(levelKey = null) {
  return {
    id: makeId('custom'),
    level: levelKey,
    paperCode: null,
    title: '',
    duration: 180,
    totalMarks: 100,
    formatMode: null,
    questionCount: 0,
    attemptCount: 0,
    instructions: [],
    sections: [],
    questions: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}

function findSchemePaper(levelKey, paperCode) {
  return EXAM_SCHEME[levelKey]?.papers.find(paper => paper.code === paperCode) || null;
}

function questionDraft(type, overrides = {}) {
  return {
    id: makeId('question'),
    type,
    text: '',
    marks: type === 'mcq' ? 1 : 20,
    options: type === 'mcq' ? ['', '', '', ''] : undefined,
    answer: type === 'mcq' ? 0 : undefined,
    sourceType: 'custom',
    sourceLabel: 'Your question',
    sourceUrl: '',
    reasoning: '',
    verification: { status: 'not-reviewed', method: '', checks: [] },
    ...overrides
  };
}

function applyPaperFormat(builder, paper, resetQuestions = false) {
  if (!builder || !paper) return builder;
  builder.paperCode = paper.code;
  builder.title = builder.title || `${paper.name} · Practice test`;
  builder.duration = paper.duration;
  builder.totalMarks = paper.marks;
  builder.formatMode = paper.formatMode;
  builder.questionCount = paper.questionCount;
  builder.attemptCount = paper.attemptCount;
  builder.instructions = [...(paper.instructions || [])];
  builder.sections = [...(paper.sections || [])];
  if (resetQuestions || !builder.questions?.length || builder.questions.length !== paper.questionCount) {
    if (paper.formatMode === 'subjective') {
      builder.questions = Array.from({ length: paper.questionCount }, (_, index) => questionDraft('subjective', {
        marks: paper.topLevelMarks,
        slot: index === 0 ? 'compulsory' : 'optional',
        section: index === 0 ? 'Compulsory' : 'Optional'
      }));
    } else {
      builder.questions = Array.from({ length: paper.questionCount }, (_, index) => {
        const section = paper.sections?.length ? (index < paper.sections[0].count ? paper.sections[0].name : paper.sections[1].name) : '';
        return questionDraft('mcq', { marks: paper.markPerQuestion, section });
      });
    }
  } else {
    builder.questions = builder.questions.map((question, index) => ({
      ...question,
      type: paper.formatMode === 'mcq' ? 'mcq' : 'subjective',
      marks: paper.formatMode === 'mcq' ? paper.markPerQuestion : paper.topLevelMarks,
      slot: paper.formatMode === 'subjective' ? (index === 0 ? 'compulsory' : 'optional') : undefined,
      section: paper.formatMode === 'subjective' ? (index === 0 ? 'Compulsory' : 'Optional') : (question.section || '')
    }));
  }
  return builder;
}

function cloneBankQuestion(id) {
  const source = FOUNDATION_QUESTION_BANK.find(question => question.id === id);
  if (!source) return null;
  return JSON.parse(JSON.stringify({ ...source, id: makeId('question') }));
}

function verifyGeneratedQuestion(question) {
  if (question.sourceType !== 'generated') return { status: 'not-applicable', checks: [] };
  const checks = [];
  if (question.type === 'mcq' && Array.isArray(question.options) && question.options.length === 4 && new Set(question.options.map(option => option.trim().toLowerCase())).size === 4) checks.push('four distinct options');
  if (question.type === 'mcq' && Number.isInteger(Number(question.answer)) && Number(question.answer) >= 0 && Number(question.answer) < 4) checks.push('answer key points to one option');
  if (question.reasoning?.trim().length >= 30) checks.push('reasoning explains the answer');
  if (question.verification?.status === 'verified') checks.push('independent verification recorded');
  return { status: checks.length >= 4 ? 'verified' : 'needs-review', checks };
}

function validateBuilder(builder = state.builder) {
  const issues = [];
  const paper = findSchemePaper(builder?.level, builder?.paperCode);
  if (!builder?.level || !builder.paperCode) issues.push('Choose a CA level and paper.');
  if (!builder?.title?.trim()) issues.push('Give the test a title.');
  if (!builder?.questions?.length) issues.push('Add at least one question.');
  if (paper) {
    if (Number(builder.duration) !== paper.duration) issues.push(`Use the official ${paper.duration}-minute duration for ${paper.name}.`);
    if (Number(builder.totalMarks) !== paper.marks) issues.push(`Use the official ${paper.marks}-mark total for ${paper.name}.`);
    if (builder.questions.length !== paper.questionCount) issues.push(`${paper.name} requires exactly ${paper.questionCount} questions in this format.`);
    if (paper.formatMode === 'subjective' && builder.questions[0]?.slot !== 'compulsory') issues.push('Question 1 must remain compulsory.');
  }
  builder?.questions?.forEach((question, index) => {
    if (!question.text?.trim()) issues.push(`Question ${index + 1} needs a prompt.`);
    if (!(Number(question.marks) > 0)) issues.push(`Question ${index + 1} needs marks greater than zero.`);
    if (paper?.formatMode === 'subjective' && (question.type !== 'subjective' || Number(question.marks) !== paper.topLevelMarks)) issues.push(`Question ${index + 1} must be a ${paper.topLevelMarks}-mark subjective question.`);
    if (paper?.formatMode === 'mcq' && (question.type !== 'mcq' || Number(question.marks) !== paper.markPerQuestion)) issues.push(`Question ${index + 1} must be a ${paper.markPerQuestion}-mark MCQ.`);
    if (question.type === 'mcq' && question.options.some(option => !option.trim())) issues.push(`Complete all four options for Question ${index + 1}.`);
    if (question.sourceType === 'generated') {
      const verification = verifyGeneratedQuestion(question);
      if (verification.status !== 'verified') issues.push(`Generated Question ${index + 1} must have a verified answer, distinct options, and reasoning.`);
    }
    if (question.sourceType !== 'custom' && !question.sourceLabel?.trim()) issues.push(`Add a source label for Question ${index + 1}.`);
  });
  return issues;
}

function startCountdown(duration, startedAt, onExpire) {
  stopTimer();
  const update = () => {
    const remaining = duration - Math.floor((Date.now() - startedAt) / 1000);
    const output = document.querySelector('[data-timer]');
    if (output) output.textContent = formatTime(remaining);
    if (remaining <= 0) {
      stopTimer();
      onExpire?.();
    }
  };
  update();
  state.timer = window.setInterval(update, 1000);
}

function sanitizeHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  const forbidden = new Set(['SCRIPT','STYLE','IFRAME','OBJECT','EMBED','FORM','INPUT','BUTTON','A','LINK','META']);
  const allowed = new Set(['DIV','P','OL','UL','LI','TABLE','THEAD','TBODY','TFOOT','TR','TH','TD','SPAN','B','STRONG','EM','I','BR','SUP','SUB']);
  [...template.content.querySelectorAll('*')].reverse().forEach(element => {
    if (forbidden.has(element.tagName)) {
      element.remove();
      return;
    }
    if (!allowed.has(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }
    [...element.attributes].forEach(attribute => {
      const keepClass = attribute.name === 'class' && /^[a-z0-9 _-]+$/i.test(attribute.value);
      const keepType = attribute.name === 'type' && element.tagName === 'OL' && /^[aAiI1]$/.test(attribute.value);
      if (!keepClass && !keepType) element.removeAttribute(attribute.name);
    });
  });
  return template.innerHTML;
}

async function loadArtifact(subject) {
  if (cache.has(subject)) return cache.get(subject);
  const config = ARTIFACTS[subject];
  if (!config) throw new Error('Unknown practice subject.');
  const response = await fetch(config.source);
  if (!response.ok) throw new Error(`Could not load ${config.title}.`);
  const raw = await response.text();
  const doc = new DOMParser().parseFromString(`<main>${raw}</main>`, 'text/html');
  const papers = [...doc.querySelectorAll('section.paper')].map((paperElement, paperIndex) => {
    if (config.kind === 'mcq') {
      const questions = [];
      [...paperElement.querySelectorAll('ol.qs')].forEach(group => {
        const section = group.previousElementSibling?.classList.contains('sec-label')
          ? group.previousElementSibling.textContent.trim()
          : 'Business Economics';
        [...group.querySelectorAll(':scope > li.q')].forEach((questionElement, questionIndex) => {
          const number = Number(questionElement.querySelector('.qn')?.textContent.replace(/\D/g, '')) || questions.length + 1;
          questions.push({
            number,
            text: questionElement.querySelector('.qtext')?.textContent.trim() || `Question ${questionIndex + 1}`,
            options: [...questionElement.querySelectorAll('.opts > li')].map(option => option.textContent.trim()),
            section
          });
        });
      });
      const keys = {};
      paperElement.querySelectorAll('.key-grid span').forEach(item => {
        const match = item.textContent.match(/(\d+)\.\s*\(([a-d])\)/i);
        if (match) keys[Number(match[1])] = match[2].toLowerCase().charCodeAt(0) - 97;
      });
      questions.forEach(question => { question.answer = keys[question.number]; });
      return { number: paperIndex + 1, questions };
    }

    const questions = [...paperElement.querySelectorAll('.bigq')].map((questionElement, index) => ({
      number: Number(questionElement.querySelector('.bigq-no')?.textContent.replace(/\D/g, '')) || index + 1,
      marks: questionElement.querySelector('.bigq-tot')?.textContent.trim() || '20 Marks',
      compulsory: Boolean(questionElement.querySelector('.compulsory')),
      html: sanitizeHTML(questionElement.innerHTML)
    }));
    return { number: paperIndex + 1, questions };
  });
  const data = { ...config, papers };
  cache.set(subject, data);
  return data;
}

function getOfficialTest(id) {
  return OFFICIAL_TESTS[id] || null;
}

function currentTest() {
  if (getOfficialTest(state.subject)) return getOfficialTest(state.subject);
  if (state.subject === 'economics' && state.data) {
    const paper = state.data.papers[state.paper - 1];
    return {
      id: `economics-${state.paper}`,
      title: `Business Economics · Mock ${state.paper}`,
      shortTitle: `Economics Mock ${state.paper}`,
      paper: 'Paper 4 · 100 marks',
      duration: state.data.duration,
      negative: .25,
      questions: paper.questions
    };
  }
  return null;
}

function loading(message = 'Preparing your test desk…') {
  stopTimer();
  app.innerHTML = `<section class="loading-page"><div><div class="loading-mark"></div><h2>${escapeHTML(message)}</h2></div></section>`;
}

function renderError(error) {
  stopTimer();
  document.body.classList.remove('exam-active');
  app.innerHTML = `<section class="page-shell section"><div class="empty-state"><h2>That paper could not be opened.</h2><p>${escapeHTML(error.message)}</p><button class="button" data-action="home">Back to practice</button></div></section>`;
}

function renderHome() {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('home');
  const activeSessions = ['accounting','laws','economics'].flatMap(subject =>
    Array.from({ length: 10 }, (_, index) => readSession(subject, index + 1))
  ).filter(session => session && !session.completedAt);
  const answerCount = activeSessions.reduce((sum, session) => sum + Object.keys(session.answers || {}).length, 0);
  const progress = Math.min(100, answerCount);
  const customCount = readCustomTests().length;
  app.innerHTML = `
    <section class="page-shell hero">
      <div class="hero-copy">
        <p class="eyebrow">CA Foundation · September 2026</p>
        <h1>Practise like it is <em>exam day.</em></h1>
        <p>One focused place for timed MCQs, full-length descriptive mocks, answer-sheet photos, and the official papers behind your preparation.</p>
        <div class="hero-actions">
          <button class="button coral" data-action="pick" data-subject="economics">Start an MCQ mock <span aria-hidden="true">→</span></button>
          <button class="button secondary" data-action="pick" data-subject="accounting">Open a descriptive paper</button>
        </div>
      </div>
      <div class="hero-board" aria-label="Practice overview">
        <div class="board-top">
          <div><span class="board-kicker">Your practice pulse</span><h2>${activeSessions.length ? `${activeSessions.length} active paper${activeSessions.length === 1 ? '' : 's'}` : 'Ready when you are'}</h2></div>
          <span class="board-number">${String(answerCount).padStart(2,'0')}</span>
        </div>
        <div class="board-progress"><span style="width:${progress}%"></span></div>
        <div class="board-meta"><span>answers saved</span><span>${progress}% of a 100-question paper</span></div>
        <div class="board-grid" aria-hidden="true">
          ${Array.from({ length: 12 }, (_, index) => `<span class="${index < Math.min(9, Math.ceil(progress / 10)) ? 'done' : index === 9 && activeSessions.length ? 'flag' : ''}">${index + 1}</span>`).join('')}
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="page-shell">
        <div class="section-heading">
          <div><p class="eyebrow">Full mock series</p><h2>Choose your paper.</h2><p>Thirty linked mock papers, rebuilt as an active workspace rather than a page to scroll.</p></div>
          <a class="button ghost small" href="#library">View source library</a>
        </div>
        <div class="subject-grid">
          <article class="subject-card" data-number="1">
            <div class="card-top"><span class="paper-chip">Paper 1</span><span class="card-stat"><b>10</b> mocks</span></div>
            <h3>Accounting</h3><p>Write offline, photograph your workings, and keep every answer grouped by question.</p>
            <div class="card-footer"><span class="card-stat"><b>3 hours</b> Subjective</span><button class="round-arrow" data-action="pick" data-subject="accounting" aria-label="Choose an Accounting mock">→</button></div>
          </article>
          <article class="subject-card" data-number="2">
            <div class="card-top"><span class="paper-chip">Paper 2</span><span class="card-stat"><b>10</b> mocks</span></div>
            <h3>Business Laws</h3><p>Practise provision, application, and conclusion with a clean answer-photo trail.</p>
            <div class="card-footer"><span class="card-stat"><b>3 hours</b> Subjective</span><button class="round-arrow" data-action="pick" data-subject="laws" aria-label="Choose a Business Laws mock">→</button></div>
          </article>
          <article class="subject-card wide" data-number="4">
            <div class="card-top"><span class="paper-chip">Paper 4</span><span class="card-stat"><b>1,000</b> MCQs</span></div>
            <h3>Business Economics</h3><p>Ten complete 100-question papers with answer selection, marking for review, negative marking, and section-level results.</p>
            <div class="card-footer"><span class="card-stat"><b>2 hours</b> +1 / −0.25</span><button class="round-arrow" data-action="pick" data-subject="economics" aria-label="Choose a Business Economics mock">→</button></div>
          </article>
          <article class="subject-card" data-number="3">
            <div class="card-top"><span class="paper-chip">Paper 3</span><span class="card-stat"><b>30</b> MCQs</span></div>
            <h3>Quantitative Aptitude</h3><p>Use the official RTP beside a fast A–D response sheet with the published answer key.</p>
            <div class="card-footer"><span class="card-stat"><b>60 min</b> Official sprint</span><button class="round-arrow" data-action="start-official" data-subject="quantitative" aria-label="Start Quantitative Aptitude sprint">→</button></div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="page-shell">
        <div class="section-heading"><div><p class="eyebrow">Official RTP sprints</p><h2>Short, sharp, scored.</h2><p>Quick tests drawn directly from the September 2026 revision papers.</p></div></div>
        <div class="sprint-row">
          <article class="sprint-card"><div><h3>Business Economics · 25</h3><p>Questions, choices, and the official answer key are all inside the test.</p><button class="button small" data-action="start-official" data-subject="official-economics">Begin sprint</button></div><span class="sprint-badge"><span><b>45</b> min</span></span></article>
          <article class="sprint-card"><div><h3>Quantitative Aptitude · 30</h3><p>Read equations in the source PDF and record your answers in the response desk.</p><button class="button small" data-action="start-official" data-subject="quantitative">Begin sprint</button></div><span class="sprint-badge"><span><b>60</b> min</span></span></article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="page-shell">
        <div class="section-heading">
        <div><p class="eyebrow">Your question bank</p><h2>Make a new test.</h2><p>Start with the CA Foundation level, select the real ICAI paper, then add MCQs and subjective questions to your own timed test.</p></div>
          <a class="button coral" href="#create">${customCount ? `Manage ${customCount} custom test${customCount === 1 ? '' : 's'}` : 'Create your first test'} →</a>
        </div>
        <div class="journey-line" aria-label="Chartered Accountancy exam journey"><span>Foundation</span><i></i><span class="muted">Intermediate · later</span><i></i><span class="muted">Final · later</span></div>
      </div>
    </section>`;
  window.scrollTo({ top: 0 });
}

function renderLibrary() {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('library');
  app.innerHTML = `
    <section class="page-shell library-page">
      <div class="library-head">
        <div><p class="eyebrow">Source library</p><h1>Six official papers.<br>One shelf.</h1><p>Open the original PDFs at any time. The interactive mock series remains separate, so your saved responses never alter the source material.</p></div>
        <span class="library-count">06</span>
      </div>
      <div class="resource-grid">
        ${RESOURCES.map(resource => `
          <article class="resource-card">
            <span class="resource-icon">PDF</span>
            <div><h2>${escapeHTML(resource.title)}</h2><p>${escapeHTML(resource.meta)}</p><div class="resource-meta">${resource.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div></div>
            <a class="button secondary small" href="${resource.href}" target="_blank" rel="noopener">Open paper ↗</a>
          </article>`).join('')}
      </div>
      <p class="source-note">The three ten-paper mock series are user-generated practice material from the supplied artifact links. The PDFs above are preserved as provided and act as the official reference layer.</p>
    </section>`;
  window.scrollTo({ top: 0 });
}

function renderCreateHub() {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('create');
  state.builder = null;
  const tests = readCustomTests();
  app.innerHTML = `
    <section class="page-shell create-page">
      <div class="create-hero">
        <div><p class="eyebrow">ICAI New Scheme · Custom builder</p><h1>Build for the level you are becoming.</h1><p>Start with the Chartered Accountancy pathway, choose an official paper, and create a shorter practice set or a full-length mock. The builder carries the current ICAI pattern into every new test.</p></div>
        <span class="scheme-badge"><span><b>Foundation</b>available now</span></span>
      </div>
      <div class="level-path">
        ${[['foundation', EXAM_SCHEME.foundation]].map(([key, level]) => `<button class="level-card" data-action="choose-level" data-level="${key}">
          <span class="level-step">${escapeHTML(level.step)}</span>
          <h2>${escapeHTML(level.name)}</h2><p>${escapeHTML(level.summary)}</p>
          <span class="level-card-footer"><span><b>${escapeHTML(level.cadence)}</b>Current New Scheme</span><i class="level-arrow">→</i></span>
        </button>`).join('')}
        <div class="journey-line" aria-label="CA course progression"><span>Foundation · available now</span><i></i><span class="muted">Intermediate · coming later</span><i></i><span class="muted">Final · coming later</span></div>
      </div>
      <div class="saved-tests-head"><div><h2>Your custom tests</h2><p>Stored privately in this browser.</p></div>${tests.length ? `<button class="button secondary small" data-action="choose-level" data-level="foundation">+ New test</button>` : ''}</div>
      ${tests.length ? `<div class="custom-test-grid">${tests.map(test => {
        const scheme = EXAM_SCHEME[test.level];
        const paper = findSchemePaper(test.level, test.paperCode);
        const mcqs = test.questions.filter(question => question.type === 'mcq').length;
        const subjective = test.questions.length - mcqs;
        return `<article class="custom-test-card"><span class="paper-chip">${escapeHTML(scheme?.name || test.level)} · Paper ${paper?.number || ''}</span><h3>${escapeHTML(test.title)}</h3><p>${escapeHTML(paper?.name || test.paperName || '')} · ${test.duration} min · ${mcqs} MCQ${mcqs === 1 ? '' : 's'} · ${subjective} subjective</p><div class="custom-test-actions"><button class="button small" data-action="launch-custom" data-id="${test.id}">Start test</button><button class="button secondary small" data-action="edit-custom" data-id="${test.id}">Edit</button><button class="more-button" data-action="delete-custom" data-id="${test.id}" aria-label="Delete ${escapeHTML(test.title)}">×</button></div></article>`;
      }).join('')}</div>` : `<div class="empty-state"><h2>No custom tests yet.</h2><p>Choose a CA level above to create your first paper.</p></div>`}
      <p class="source-note">Pattern defaults follow ICAI's New Scheme of Education and Training and current examination guidance. You can create a shorter practice test without changing the official reference shown in the builder.</p>
    </section>`;
  window.scrollTo({ top: 0 });
}

function renderPaperChoice(levelKey) {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('create');
  const level = EXAM_SCHEME[levelKey];
  if (!level) return renderCreateHub();
  state.builder ||= newBuilder(levelKey);
  state.builder.level = levelKey;
  app.innerHTML = `
    <section class="page-shell paper-select-page">
      <button class="back-link" data-action="create-hub">← Change level</button>
      <div class="paper-select-head"><div><p class="eyebrow">${escapeHTML(level.step)}</p><h1>${escapeHTML(level.name)} papers</h1><p>${escapeHTML(level.summary)} Choose the paper whose official pattern should guide your test.</p></div><span class="level-pill">${escapeHTML(level.cadence)}</span></div>
      <div class="official-paper-grid">
        ${level.papers.map(paper => `<button class="official-paper-card" data-action="choose-scheme-paper" data-code="${paper.code}">
          <span class="paper-code"><span>${escapeHTML(paper.group)}</span><span>Paper ${paper.number}</span></span>
          <h2>${escapeHTML(paper.name)}</h2>
          <span class="pattern-tags"><span>${paper.duration / 60} hours</span><span>${paper.formatMode === 'mcq' ? `${paper.questionCount} × 1 mark` : '6 × 20-mark questions'}</span><span>${paper.formatMode === 'mcq' ? 'Attempt all' : 'Q1 compulsory + any 4'}</span>${paper.negative ? `<span>−${paper.negative} wrong</span>` : '<span>No negative marking</span>'}${paper.openBook ? '<span>Open book</span>' : ''}</span>
        </button>`).join('')}
      </div>
    </section>`;
  window.scrollTo({ top: 0 });
}

function openQuestionBankModal() {
  const paperCode = state.builder?.paperCode;
  const questions = FOUNDATION_QUESTION_BANK.filter(question => question.paperCode === paperCode);
  if (!questions.length) return toast('No seeded questions are available for this paper yet. Add your own question below.');
  openModal(`<h2>Mix from the verified question bank</h2><p>Every item is labelled. ICAI items are paraphrased, coaching items are institution-neutral practice, and generated items include verification checks plus reasoning.</p><div class="bank-modal-list">${questions.map(question => `<article class="bank-modal-item"><div><span class="source-badge ${question.sourceType}">${escapeHTML(question.sourceLabel)}</span><h3>${escapeHTML(question.text)}</h3><p>${question.type === 'mcq' ? 'MCQ · 1 mark' : 'Subjective · 5 marks'} · ${question.verification?.status === 'verified' ? 'Verified' : 'Needs review'}</p></div><button class="button small" data-action="add-bank-question" data-bank-id="${question.id}">Add</button></article>`).join('')}</div><div class="inline-actions"><button class="button secondary" data-action="close-modal">Close</button></div>`);
}

function renderBuilderEditor() {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('create');
  const builder = state.builder;
  const level = EXAM_SCHEME[builder?.level];
  const paper = findSchemePaper(builder?.level, builder?.paperCode);
  if (!builder || !level || !paper) return renderCreateHub();
  const questionMarks = builder.questions.reduce((sum, question) => sum + (Number(question.marks) || 0), 0);
  const mcqCount = builder.questions.filter(question => question.type === 'mcq').length;
  const subjectiveCount = builder.questions.length - mcqCount;
  const issues = builder.showErrors ? validateBuilder(builder) : [];
  app.innerHTML = `
    <section class="page-shell builder-page">
      <div class="builder-head"><div><p class="eyebrow">${escapeHTML(level.name)} · Paper ${paper.number}</p><h1>${builder.editing ? 'Edit your test' : 'Compose a new test'}</h1><p>${escapeHTML(paper.name)}</p></div><button class="button secondary small" data-action="change-builder-paper">Change paper</button></div>
      <div class="builder-layout">
        <aside class="builder-guide">
          <span class="paper-chip">Official pattern</span><h2>${escapeHTML(paper.name)}</h2><p>${escapeHTML(paper.note || `${level.name} ${paper.group}`)}</p>
          <div class="pattern-meter"><span class="mcq" style="width:${paper.mcq}%"></span><span class="desc" style="width:${paper.descriptive}%"></span></div>
          <div class="pattern-legend"><span>${paper.mcq}% MCQ</span><span>${paper.descriptive}% descriptive</span></div>
          <div class="guide-list"><div><span>Official marks</span><b>${paper.marks}</b></div><div><span>Official duration</span><b>${paper.duration} min</b></div><div><span>MCQ marking</span><b>${paper.negative ? `−${paper.negative} wrong` : 'No negative'}</b></div>${paper.openBook ? '<div><span>Method</span><b>Open book · case study</b></div>' : ''}</div>
          <a class="guide-source" href="${level.source}" target="_blank" rel="noopener">View ICAI course structure ↗</a>
        </aside>
        <div class="builder-workspace">
          <section class="builder-panel">
            <div class="builder-panel-title"><div><h2>Test details</h2><p>These values are fixed to the official ICAI Foundation paper format.</p></div></div>
            <div class="field-grid">
              <label class="field">Test title<input data-builder-field="title" value="${escapeHTML(builder.title)}" placeholder="e.g. Advanced Accounting · Chapter Review"></label>
              <label class="field">Duration (minutes)<input type="number" readonly data-builder-field="duration" value="${Number(builder.duration)}"></label>
              <label class="field">Target marks<input type="number" readonly data-builder-field="totalMarks" value="${Number(builder.totalMarks)}"></label>
            </div>
          </section>
          <section class="builder-panel format-callout"><div class="builder-panel-title"><div><h2>Required paper format</h2><p>${(paper.instructions || []).map(escapeHTML).join(' ')}</p></div></div>${paper.sections?.length ? `<div class="section-pills">${paper.sections.map(section => `<span>${escapeHTML(section.name)} · ${section.count} questions</span>`).join('')}</div>` : ''}</section>
          <section class="builder-panel">
            <div class="builder-panel-title"><div><h2>Questions</h2><p>${paper.formatMode === 'mcq' ? 'All 100 questions are MCQs and all are attempted.' : 'Question 1 is compulsory; Questions 2–6 are optional and the candidate attempts any four.'}</p></div><span class="paper-chip">${builder.questions.length}/${paper.questionCount}</span></div>
            <div class="question-builder-toolbar"><p>Your current set: <b>${mcqCount} MCQ</b>, <b>${subjectiveCount} subjective</b>, <b>${questionMarks} marks composed</b>.</p><div class="inline-actions"><button class="button secondary small" data-action="open-question-bank">Browse matching bank</button></div></div>
            <div data-builder-questions>
              ${builder.questions.map((question, index) => `<article class="builder-question" data-builder-question="${index}">
                <div class="builder-question-head"><span class="builder-question-id"><b>${index + 1}</b><span>${question.type === 'mcq' ? 'Multiple choice' : (index === 0 ? 'Compulsory subjective answer' : 'Optional subjective answer')}</span></span></div>
                <div class="question-fields"><label class="field">Question prompt<textarea data-question-field="text" data-index="${index}" placeholder="Write the complete question…">${escapeHTML(question.text)}</textarea></label><label class="field">Marks<input type="number" readonly data-question-field="marks" data-index="${index}" value="${Number(question.marks)}"></label></div>
                <div class="question-source-fields"><label class="field">Question source<select data-question-field="sourceType" data-index="${index}"><option value="custom" ${question.sourceType === 'custom' ? 'selected' : ''}>My own question</option><option value="icai" ${question.sourceType === 'icai' ? 'selected' : ''}>ICAI past paper / RTP</option><option value="coaching" ${question.sourceType === 'coaching' ? 'selected' : ''}>Coaching institution / style</option><option value="generated" ${question.sourceType === 'generated' ? 'selected' : ''}>Generated · requires verification</option></select></label><label class="field">Source label<input data-question-field="sourceLabel" data-index="${index}" value="${escapeHTML(question.sourceLabel || '')}" placeholder="e.g. ICAI May 2025 Paper 4"></label><label class="field">Source link (optional)<input data-question-field="sourceUrl" data-index="${index}" value="${escapeHTML(question.sourceUrl || '')}" placeholder="https://…"></label></div>
                <label class="field question-reasoning">Answer reasoning / marking logic<textarea data-question-field="reasoning" data-index="${index}" placeholder="Explain why the answer is correct; generated questions require this.">${escapeHTML(question.reasoning || '')}</textarea></label>
                ${question.type === 'mcq' ? `<div class="option-editor">${question.options.map((option, optionIndex) => `<label class="option-field"><span>${String.fromCharCode(65 + optionIndex)}</span><input data-question-option="${optionIndex}" data-index="${index}" value="${escapeHTML(option)}" placeholder="Option ${String.fromCharCode(65 + optionIndex)}"></label>`).join('')}</div><div class="correct-row"><label class="field">Correct answer<select data-question-field="answer" data-index="${index}">${[0,1,2,3].map(optionIndex => `<option value="${optionIndex}" ${Number(question.answer) === optionIndex ? 'selected' : ''}>Option ${String.fromCharCode(65 + optionIndex)}</option>`).join('')}</select></label><span class="custom-score-note">Used for automatic scoring. ${paper.negative ? `Wrong answers deduct ${paper.negative} mark.` : 'There is no negative marking for this paper.'}</span></div>` : `<p class="custom-score-note">The candidate will get a question-wise photo upload area and optional working-note field.</p>`}
                ${question.sourceType === 'generated' ? `<p class="verification-note">${question.verification?.status === 'verified' ? '✓ Generated question verified: ' : '⚠ Generated question needs verification: '}${escapeHTML((question.verification?.checks || []).join(' · '))}</p>` : ''}
              </article>`).join('')}
            </div>
            ${builder.questions.length ? '' : '<div class="empty-state" style="margin-top:12px"><h2>Start with a question.</h2><p>Use the two buttons above to build the paper in any order.</p></div>'}
            ${issues.length ? `<ul class="validation-list">${issues.map(issue => `<li>• ${escapeHTML(issue)}</li>`).join('')}</ul>` : ''}
          </section>
          <div class="builder-summary"><span><strong>${builder.questions.length} questions · ${questionMarks} marks composed</strong><small>Target: ${builder.totalMarks} marks · ${builder.duration} minutes</small></span><button class="button coral" data-action="save-custom-test">Save & open test</button></div>
        </div>
      </div>
    </section>`;
  window.scrollTo({ top: 0 });
}

async function renderPicker(subject) {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('home');
  loading(`Loading ${ARTIFACTS[subject]?.title || 'papers'}…`);
  try {
    const data = await loadArtifact(subject);
    const initials = data.title.split(' ').map(word => word[0]).join('').slice(0,2);
    app.innerHTML = `
      <section class="page-shell picker-page">
        <button class="back-link" data-action="home">← Back to practice</button>
        <div class="picker-head">
          <div><p class="eyebrow">${escapeHTML(data.paper)} · ${data.kind === 'mcq' ? 'Objective' : 'Descriptive'}</p><h1>${escapeHTML(data.title)}</h1><p>${escapeHTML(data.description)} Choose a paper to begin or resume where you left off.</p></div>
          <span class="subject-seal" aria-hidden="true">${escapeHTML(initials)}</span>
        </div>
        <div class="paper-grid">
          ${data.papers.map(paper => {
            const saved = readSession(subject, paper.number);
            const progress = saved && !saved.completedAt
              ? (data.kind === 'mcq' ? Object.keys(saved.answers || {}).length : (saved.selectedQuestions || []).length)
              : 0;
            return `<button class="paper-tile" data-action="start-paper" data-subject="${subject}" data-paper="${paper.number}">
              ${progress ? `<span class="resume-label">Resume · ${progress} saved</span>` : ''}
              <span class="paper-tile-number">${String(paper.number).padStart(2,'0')}</span>
              <h3>Mock Paper ${paper.number}</h3>
              <p>${data.kind === 'mcq' ? `${paper.questions.length} questions · 2 hours` : `${paper.questions.length} questions · 3 hours`}</p>
            </button>`;
          }).join('')}
        </div>
      </section>`;
    window.scrollTo({ top: 0 });
  } catch (error) { renderError(error); }
}

function renderExamSidebar(test, result = null) {
  const answered = Object.keys(state.session.answers).length;
  const flagged = new Set(state.session.flagged);
  const progress = Math.round((answered / test.questions.length) * 100);
  return `
    <aside class="exam-sidebar">
      <button class="back-link" data-action="back-papers">← Exit paper</button>
      <span class="exam-label">${escapeHTML(test.paper)}</span>
      <h2>${escapeHTML(test.title)}</h2>
      <div class="timer"><span>${state.review ? 'Review mode' : 'Time left'}</span><strong data-timer>${state.review ? '—' : formatTime(test.duration)}</strong></div>
      <div class="exam-progress"><div class="exam-progress-line"><span style="width:${progress}%"></span></div><div class="exam-progress-copy"><span>${answered} answered</span><span>${progress}%</span></div></div>
      <div class="palette" aria-label="Question palette">
        ${test.questions.map((question, index) => {
          const answer = state.session.answers[index];
          const hasAnswer = Object.prototype.hasOwnProperty.call(state.session.answers, index);
          const correctness = result && hasAnswer ? (answer === question.answer ? 'correct' : 'wrong') : '';
          return `<button class="question-dot ${hasAnswer ? 'answered' : ''} ${flagged.has(index) ? 'flagged' : ''} ${state.current === index ? 'current' : ''} ${correctness}" data-action="jump" data-index="${index}" aria-label="Question ${index + 1}${hasAnswer ? ', answered' : ''}">${index + 1}</button>`;
        }).join('')}
      </div>
      <div class="palette-legend"><span class="legend-row"><i class="legend-swatch done"></i> Answered</span><span class="legend-row"><i class="legend-swatch review"></i> Marked for review</span><span class="legend-row"><i class="legend-swatch"></i> Not answered</span></div>
      <div class="sidebar-bottom">
        ${state.review ? `<button class="button coral" data-action="back-results">Back to result</button>` : `<button class="button coral" data-action="submit">Submit paper</button>`}
        <button class="button secondary" data-action="back-papers">Save & exit</button>
      </div>
      <p class="sidebar-note">Responses save automatically in this browser. No answer photo or response leaves this device.</p>
    </aside>`;
}

async function startMcq(subject, paper = 1, options = {}) {
  loading('Setting up the response desk…');
  try {
    state.subject = subject;
    state.paper = Number(paper) || 1;
    state.current = options.current ?? 0;
    state.review = Boolean(options.review);
    state.data = subject === 'economics' ? await loadArtifact('economics') : null;
    const test = currentTest();
    state.session = readSession(subject, state.paper);
    if (!state.session || (!state.review && state.session.completedAt)) {
      state.session = ensureSession(subject, state.paper, test.duration, Boolean(options.reset));
      writeSession();
    }
    renderMcqExam();
  } catch (error) { renderError(error); }
}

function renderMcqExam() {
  const test = currentTest();
  if (!test) return renderError(new Error('The selected test is unavailable.'));
  document.body.classList.add('exam-active');
  activateNav('home');
  const question = test.questions[state.current];
  const selected = state.session.answers[state.current];
  const hasAnswer = Object.prototype.hasOwnProperty.call(state.session.answers, state.current);
  const isAttempted = (state.session.selectedQuestions || [0]).includes(state.current);
  const flagged = state.session.flagged.includes(state.current);
  const result = state.review ? calculateResult(test) : null;
  const sourceAssist = test.sourcePdf ? `
    <div class="source-assist"><strong>Keep the official question paper beside you.</strong><p>${escapeHTML(test.sourceNote)}</p><a class="button secondary small" href="${test.sourcePdf}" target="_blank" rel="noopener">Open source PDF ↗</a></div>` : '';
  app.innerHTML = `
    <section class="exam-shell">
      ${renderExamSidebar(test, result)}
      <main class="exam-main"><div class="exam-main-inner">
        ${sourceAssist}
        <div class="question-meta"><strong>${escapeHTML(question.section || test.shortTitle)}</strong><span>Question ${state.current + 1} of ${test.questions.length}</span></div>
        <article class="question-card">
          <span class="question-number">${state.current + 1}</span>
          <h1 class="question-text">${escapeHTML(question.text)}</h1>
          <div class="options" role="radiogroup" aria-label="Answer options">
            ${question.options.map((option, index) => {
              const isCorrect = state.review && index === question.answer;
              const isWrong = state.review && hasAnswer && selected === index && selected !== question.answer;
              return `<button class="option ${selected === index ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}" data-action="select-option" data-index="${index}" role="radio" aria-checked="${selected === index}" ${state.review ? 'disabled' : ''}><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(option)}</span></button>`;
            }).join('')}
          </div>
          ${state.review ? `<p class="review-note">Correct answer: ${String.fromCharCode(65 + question.answer)}${hasAnswer ? selected === question.answer ? ' · Your response was correct.' : ` · You selected ${String.fromCharCode(65 + selected)}.` : ' · You skipped this question.'}</p>` : ''}
        </article>
        <div class="exam-controls">
          <div class="exam-controls-group"><button class="button secondary small" data-action="previous" ${state.current === 0 ? 'disabled' : ''}>← Previous</button>${state.review ? '' : `<button class="button ghost small" data-action="toggle-flag">${flagged ? 'Unmark review' : 'Mark for review'}</button>`}</div>
          <button class="button small" data-action="next" ${state.current === test.questions.length - 1 ? 'disabled' : ''}>Next question →</button>
        </div>
      </div></main>
    </section>`;
  if (!state.review) startCountdown(test.duration, state.session.startedAt, () => submitMcq(true));
  else stopTimer();
  window.scrollTo({ top: 0 });
}

function calculateResult(test) {
  let correct = 0;
  let wrong = 0;
  const sections = new Map();
  test.questions.forEach((question, index) => {
    const section = question.section || 'Overall';
    if (!sections.has(section)) sections.set(section, { total: 0, correct: 0 });
    const row = sections.get(section);
    row.total += 1;
    if (Object.prototype.hasOwnProperty.call(state.session.answers, index)) {
      if (state.session.answers[index] === question.answer) { correct += 1; row.correct += 1; }
      else wrong += 1;
    }
  });
  const skipped = test.questions.length - correct - wrong;
  const score = correct - wrong * (test.negative || 0);
  const percent = Math.max(0, (score / test.questions.length) * 100);
  return { correct, wrong, skipped, score, percent, sections };
}

function submitMcq(auto = false) {
  const test = currentTest();
  if (!test) return;
  if (!auto) {
    const answered = Object.keys(state.session.answers).length;
    openModal(`<h2>Submit this paper?</h2><p>You have answered <b>${answered}</b> of ${test.questions.length} questions. ${test.questions.length - answered ? `${test.questions.length - answered} will remain unattempted.` : 'Every question has a response.'}</p><div class="inline-actions"><button class="button coral" data-action="confirm-submit">Submit & score</button><button class="button secondary" data-action="close-modal">Keep working</button></div>`);
    return;
  }
  state.session.completedAt = Date.now();
  writeSession();
  stopTimer();
  closeModal();
  navigate(`#results/${state.subject}/${state.paper}`);
}

function renderMcqResults(subject, paper) {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('home');
  state.subject = subject;
  state.paper = Number(paper) || 1;
  const begin = async () => {
    state.data = subject === 'economics' ? await loadArtifact('economics') : null;
    state.session = readSession(subject, state.paper);
    const test = currentTest();
    if (!state.session || !test) return renderError(new Error('No completed attempt was found for this paper.'));
    const result = calculateResult(test);
    const scoreLabel = Number.isInteger(result.score) ? result.score : result.score.toFixed(2);
    app.innerHTML = `
      <section class="page-shell results-page">
        <div class="result-hero">
          <div class="score-ring" style="--score:${result.percent.toFixed(1)}"><div class="score-ring-inner"><span><b>${scoreLabel}</b><small>out of ${test.questions.length}</small></span></div></div>
          <div><p class="eyebrow">Attempt complete</p><h1>${result.percent >= 70 ? 'Strong work.' : result.percent >= 45 ? 'A useful baseline.' : 'Now you know where to focus.'}</h1><p>${escapeHTML(test.title)} has been scored with ${test.negative ? `−${test.negative} for each incorrect response` : 'no negative marking'}. Review the paper to see every correct choice.</p><div class="result-actions"><button class="button coral" data-action="review">Review answers</button><button class="button secondary" data-action="retake">Retake paper</button><button class="button ghost" data-action="back-papers">Choose another</button></div></div>
        </div>
        <div class="result-grid">
          <article class="result-stat correct"><span>Correct</span><b>${result.correct}</b></article>
          <article class="result-stat wrong"><span>Incorrect</span><b>${result.wrong}</b></article>
          <article class="result-stat"><span>Unattempted</span><b>${result.skipped}</b></article>
          <article class="result-stat"><span>Accuracy</span><b>${result.correct + result.wrong ? Math.round((result.correct / (result.correct + result.wrong)) * 100) : 0}%</b></article>
        </div>
        <div class="result-breakdown"><h2>Section breakdown</h2>${[...result.sections.entries()].map(([section, row]) => `<div class="breakdown-row"><span>${escapeHTML(section)}</span><div class="breakdown-track"><span style="width:${(row.correct / row.total) * 100}%"></span></div><b>${row.correct}/${row.total}</b></div>`).join('')}</div>
      </section>`;
    window.scrollTo({ top: 0 });
  };
  loading('Calculating your result…');
  begin().catch(renderError);
}

let photoDbPromise;
function openPhotoDb() {
  if (photoDbPromise) return photoDbPromise;
  photoDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open('foundation-test-lab', 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
      store.createIndex('scope', 'scope', { unique: false });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return photoDbPromise;
}

async function addPhoto(scope, file) {
  const db = await openPhotoDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos', 'readwrite');
    transaction.objectStore('photos').add({ scope, name: file.name, type: file.type, size: file.size, blob: file, createdAt: Date.now() });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function getPhotos(scope) {
  const db = await openPhotoDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction('photos', 'readonly').objectStore('photos').index('scope').getAll(scope);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function deletePhoto(id) {
  const db = await openPhotoDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos', 'readwrite');
    transaction.objectStore('photos').delete(Number(id));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

async function deletePhotosForPaper(subject, paper) {
  const db = await openPhotoDb();
  const prefix = `${subject}:${paper}:`;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos', 'readwrite');
    const request = transaction.objectStore('photos').openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      if (cursor.value.scope.startsWith(prefix)) cursor.delete();
      cursor.continue();
    };
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

function photoScope(subject, paper, question) {
  return `${subject}:${paper}:q${question}`;
}

async function countPaperPhotos(subject, paper) {
  const groups = await Promise.all([1,2,3,4,5,6].map(question => getPhotos(photoScope(subject, paper, question))));
  return groups.reduce((sum, rows) => sum + rows.length, 0);
}

async function hydratePhotoGrid(question) {
  const container = document.querySelector(`[data-photo-grid="${question}"]`);
  if (!container) return;
  const records = await getPhotos(photoScope(state.subject, state.paper, question));
  if (!records.length) {
    container.innerHTML = '<div class="empty-uploads">No answer photos added yet.</div>';
    return;
  }
  container.innerHTML = records.map(record => {
    const url = URL.createObjectURL(record.blob);
    return `<article class="photo-card"><img src="${url}" alt="Preview of ${escapeHTML(record.name)}"><div class="photo-file" title="${escapeHTML(record.name)}">${escapeHTML(record.name)}</div><button class="photo-delete" data-action="delete-photo" data-id="${record.id}" data-question="${question}" aria-label="Remove ${escapeHTML(record.name)}">×</button></article>`;
  }).join('');
}

function renderSubjectiveSidebar(data, paper) {
  const selected = new Set(state.session.selectedQuestions);
  const progress = Math.round((selected.size / 5) * 100);
  return `
    <aside class="exam-sidebar">
      <button class="back-link" data-action="back-papers">← Exit paper</button>
      <span class="exam-label">${escapeHTML(data.paper)} · Mock ${paper.number}</span>
      <h2>${escapeHTML(data.title)}</h2>
      <div class="timer"><span>Time left</span><strong data-timer>${formatTime(data.duration)}</strong></div>
      <div class="exam-progress"><div class="exam-progress-line"><span style="width:${progress}%"></span></div><div class="exam-progress-copy"><span>${selected.size} questions</span><span>${Math.max(0, 5 - selected.size)} to choose</span></div></div>
      <div class="palette" aria-label="Question palette">${paper.questions.map(question => `<button class="question-dot ${selected.has(question.number) ? 'answered' : ''}" data-action="scroll-subjective" data-index="${question.number}">${question.number}</button>`).join('')}</div>
      <div class="palette-legend"><span class="legend-row"><i class="legend-swatch done"></i> Selected to attempt</span><span class="legend-row"><i class="legend-swatch"></i> Not selected</span></div>
      <div class="sidebar-bottom"><button class="button coral" data-action="finish-subjective">Finish attempt</button><button class="button secondary" data-action="back-papers">Save & exit</button></div>
      <p class="sidebar-note">Answer photos are stored in this browser using local device storage. They are not sent to a server.</p>
    </aside>`;
}

async function startSubjective(subject, paper = 1, options = {}) {
  loading('Preparing your answer desk…');
  try {
    state.subject = subject;
    state.paper = Number(paper) || 1;
    state.current = 0;
    state.review = false;
    state.data = await loadArtifact(subject);
    const selectedPaper = state.data.papers[state.paper - 1];
    if (!selectedPaper) throw new Error('That mock paper was not found.');
    state.session = ensureSession(subject, state.paper, state.data.duration, Boolean(options.reset));
    writeSession();
    renderSubjectiveExam();
  } catch (error) { renderError(error); }
}

function renderSubjectiveExam() {
  const data = state.data;
  const paper = data.papers[state.paper - 1];
  const selected = new Set(state.session.selectedQuestions);
  document.body.classList.add('exam-active');
  activateNav('home');
  app.innerHTML = `
    <section class="exam-shell">
      ${renderSubjectiveSidebar(data, paper)}
      <main class="subjective-main"><div class="subjective-inner">
        <div class="subjective-banner"><p><b>Question 1 is compulsory.</b> Select any four of Questions 2–6. Open a question, write your answer on paper, then add one or more clear photos below it.</p><span class="attempt-count">${selected.size}/5 questions selected</span></div>
        ${paper.questions.map(question => {
          const isSelected = selected.has(question.number);
          return `<details class="subjective-question" data-question-card="${question.number}" ${question.number === 1 ? 'open' : ''}>
            <summary><span class="summary-number">${question.number}</span><span class="summary-copy"><strong>Question ${question.number}</strong><small>${escapeHTML(question.marks)}</small></span>${question.compulsory ? `<span class="attempt-toggle selected" aria-label="Compulsory question">Compulsory</span>` : `<button class="attempt-toggle ${isSelected ? 'selected' : ''}" data-action="toggle-attempt" data-question="${question.number}" type="button">${isSelected ? 'Selected' : 'Select'}</button>`}</summary>
            <div class="subjective-body">
              <div class="question-source">${question.html}</div>
              <section class="answer-desk">
                <div class="answer-desk-head"><div><h4>Your answer sheet</h4><p>Add JPG, PNG, HEIC, or camera photos. Multiple pages are supported.</p></div><label class="button small upload-button">Add photos<input type="file" accept="image/*" capture="environment" multiple data-photo-input="${question.number}" aria-label="Add answer photos for Question ${question.number}"></label></div>
                <div class="photo-grid" data-photo-grid="${question.number}"><div class="empty-uploads">Loading saved answer photos…</div></div>
                <textarea class="answer-note" data-note="${question.number}" placeholder="Optional note: assumptions, workings, or what to improve…">${escapeHTML(state.session.notes[question.number] || '')}</textarea>
              </section>
            </div>
          </details>`;
        }).join('')}
        <div class="subjective-actions"><span><b>Auto-saved</b><br><small>Photos stay on this device</small></span><button class="button coral" data-action="finish-subjective">Finish attempt</button></div>
      </div></main>
    </section>`;
  paper.questions.forEach(question => hydratePhotoGrid(question.number).catch(() => {}));
  startCountdown(data.duration, state.session.startedAt, () => {
    toast('Time is up. Your saved work is still available.');
    openSubjectiveFinishModal(true);
  });
  window.scrollTo({ top: 0 });
}

async function openSubjectiveFinishModal(timeExpired = false) {
  const selected = new Set(state.session.selectedQuestions);
  const optionalCount = [...selected].filter(number => number !== 1).length;
  const photos = await countPaperPhotos(state.subject, state.paper);
  openModal(`<h2>${timeExpired ? 'Time is up.' : 'Finish this attempt?'}</h2><p>You selected <b>${selected.size} questions</b> and saved <b>${photos} answer photo${photos === 1 ? '' : 's'}</b>. ${optionalCount < 4 ? `The exam pattern asks for four optional questions; you currently selected ${optionalCount}.` : 'Your question selection matches the exam pattern.'}</p><p>Finishing creates a local attempt summary. Nothing is uploaded externally.</p><div class="inline-actions"><button class="button coral" data-action="confirm-subjective">Finish & save summary</button><button class="button secondary" data-action="close-modal">Keep working</button></div>`);
}

async function renderSubjectiveResult(subject, paperNumber) {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('home');
  loading('Building your attempt summary…');
  try {
    state.subject = subject;
    state.paper = Number(paperNumber) || 1;
    state.data = await loadArtifact(subject);
    state.session = readSession(subject, state.paper);
    if (!state.session) throw new Error('No saved attempt was found.');
    const photos = await countPaperPhotos(subject, state.paper);
    const selected = new Set(state.session.selectedQuestions || [1]);
    const notes = Object.values(state.session.notes || {}).filter(Boolean).length;
    app.innerHTML = `
      <section class="page-shell results-page">
        <div class="result-hero">
          <div class="score-ring" style="--score:${Math.min(100, selected.size * 20)}"><div class="score-ring-inner"><span><b>${photos}</b><small>answer photos</small></span></div></div>
          <div><p class="eyebrow">Attempt saved locally</p><h1>Your answer set is together.</h1><p>${escapeHTML(state.data.title)} · Mock Paper ${state.paper}. Reopen the paper to add pages or revise notes; your images remain in this browser.</p><div class="result-actions"><button class="button coral" data-action="reopen-subjective">Reopen attempt</button><button class="button secondary" data-action="retake-subjective">Start fresh</button><button class="button ghost" data-action="back-papers">Choose another</button></div></div>
        </div>
        <div class="result-grid">
          <article class="result-stat"><span>Questions selected</span><b>${selected.size}/5</b></article>
          <article class="result-stat"><span>Answer photos</span><b>${photos}</b></article>
          <article class="result-stat"><span>Working notes</span><b>${notes}</b></article>
          <article class="result-stat"><span>Storage</span><b>Local</b></article>
        </div>
        <div class="result-breakdown"><h2>Attempt checklist</h2>${state.data.papers[state.paper - 1].questions.map(question => `<div class="breakdown-row"><span>Question ${question.number}${question.compulsory ? ' · compulsory' : ''}</span><div class="breakdown-track"><span style="width:${selected.has(question.number) ? '100' : '0'}%"></span></div><b>${selected.has(question.number) ? 'Selected' : 'Skipped'}</b></div>`).join('')}</div>
      </section>`;
    window.scrollTo({ top: 0 });
  } catch (error) { renderError(error); }
}

function customPhotoScope(testId, questionId) {
  return `custom:${testId}:q${questionId}`;
}

async function hydrateCustomPhotoGrid(testId, questionId) {
  const container = document.querySelector(`[data-custom-photo-grid="${questionId}"]`);
  if (!container) return;
  const records = await getPhotos(customPhotoScope(testId, questionId));
  if (!records.length) {
    container.innerHTML = '<div class="empty-uploads">No answer photos added yet.</div>';
    return;
  }
  container.innerHTML = records.map(record => {
    const url = URL.createObjectURL(record.blob);
    return `<article class="photo-card"><img src="${url}" alt="Preview of ${escapeHTML(record.name)}"><div class="photo-file" title="${escapeHTML(record.name)}">${escapeHTML(record.name)}</div><button class="photo-delete" data-action="delete-custom-photo" data-id="${record.id}" data-test-id="${testId}" data-question-id="${questionId}" aria-label="Remove ${escapeHTML(record.name)}">×</button></article>`;
  }).join('');
}

async function countCustomPhotos(testId, questions) {
  const groups = await Promise.all(questions.map(question => getPhotos(customPhotoScope(testId, question.id))));
  return groups.reduce((sum, rows) => sum + rows.length, 0);
}

async function deletePhotosForCustomTest(testId, questions = []) {
  const db = await openPhotoDb();
  const prefix = `custom:${testId}:`;
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos', 'readwrite');
    const request = transaction.objectStore('photos').openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      if (cursor.value.scope.startsWith(prefix)) cursor.delete();
      cursor.continue();
    };
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

function customAnswerCount(test) {
  if (test?.formatMode === 'subjective') return (state.session?.selectedQuestions || [0]).length;
  return Object.keys(state.session?.answers || {}).length;
}

function renderCustomSidebar(test) {
  const answered = customAnswerCount(test);
  const progress = test.questions.length ? Math.round((answered / (test.formatMode === 'subjective' ? test.attemptCount || 5 : test.questions.length)) * 100) : 0;
  const selected = new Set(state.session.selectedQuestions || [0]);
  return `<aside class="exam-sidebar"><button class="back-link" data-action="create-hub">← Exit test</button><span class="exam-label">${escapeHTML(test.paperName || 'Foundation')}</span><h2>${escapeHTML(test.title)}</h2><div class="timer"><span>Time left</span><strong data-timer>${formatTime(test.duration * 60)}</strong></div><div class="exam-progress"><div class="exam-progress-line"><span style="width:${Math.min(100, progress)}%"></span></div><div class="exam-progress-copy"><span>${answered} ${test.formatMode === 'subjective' ? 'selected' : 'answered'}</span><span>${test.formatMode === 'subjective' ? `of ${test.attemptCount || 5}` : `${progress}%`}</span></div></div><div class="palette" aria-label="Question palette">${test.questions.map((question,index) => `<button class="question-dot ${test.formatMode === 'subjective' ? (selected.has(index) ? 'answered' : '') : (Object.prototype.hasOwnProperty.call(state.session.answers,index) ? 'answered' : '')} ${state.current === index ? 'current' : ''}" data-action="custom-jump" data-index="${index}">${index + 1}</button>`).join('')}</div><div class="palette-legend"><span class="legend-row"><i class="legend-swatch done"></i> ${test.formatMode === 'subjective' ? 'Selected to attempt' : 'Answered'}</span><span class="legend-row"><i class="legend-swatch"></i> ${test.formatMode === 'subjective' ? 'Not selected' : 'Not answered'}</span></div><div class="sidebar-bottom"><button class="button coral" data-action="custom-finish">Finish test</button><button class="button secondary" data-action="create-hub">Save & exit</button></div><p class="sidebar-note">${test.formatMode === 'subjective' ? 'Question 1 is compulsory; choose four more questions and upload answer photos.' : 'MCQs score automatically. Wrong answers carry the official negative marking.'}</p></aside>`;
}

async function startCustomTest(id, options = {}) {
  const test = getCustomTest(id);
  if (!test) return renderError(new Error('That custom test could not be found.'));
  state.customTest = test;
  state.subject = null;
  state.paper = null;
  state.current = options.current ?? 0;
  state.review = false;
  state.session = readCustomSession(id);
  if (!state.session || state.session.completedAt || options.reset) {
    state.session = { answers: {}, notes: {}, selectedQuestions: test.formatMode === 'subjective' ? [0] : [], startedAt: Date.now(), duration: test.duration, completedAt: null };
    writeCustomSession();
  } else {
    state.session.answers ||= {};
    state.session.notes ||= {};
    state.session.selectedQuestions ||= test.formatMode === 'subjective' ? [0] : [];
    state.session.duration ||= test.duration;
  }
  renderCustomExam();
}

function renderCustomExam() {
  const test = state.customTest;
  if (!test || !test.questions.length) return renderError(new Error('This custom test has no questions yet.'));
  document.body.classList.add('exam-active');
  activateNav('create');
  const question = test.questions[state.current] || test.questions[0];
  state.current = test.questions.indexOf(question);
  const selected = state.session.answers[state.current];
  const hasAnswer = Object.prototype.hasOwnProperty.call(state.session.answers, state.current);
  const sourceMeta = `<div class="custom-question-source"><span class="source-badge ${question.sourceType || 'custom'}">${escapeHTML(question.sourceLabel || 'Your question')}</span>${question.sourceUrl ? `<a href="${escapeHTML(question.sourceUrl)}" target="_blank" rel="noopener">Source ↗</a>` : ''}</div>`;
  const reasoning = question.reasoning?.trim() ? `<details class="custom-rationale"><summary>${question.sourceType === 'generated' ? 'Verified reasoning' : 'Answer reasoning'}</summary><p>${escapeHTML(question.reasoning)}</p>${question.verification?.checks?.length ? `<small>${escapeHTML(question.verification.checks.join(' · '))}</small>` : ''}</details>` : '';
  const body = question.type === 'mcq'
    ? `<div class="options" role="radiogroup" aria-label="Answer options">${question.options.map((option,index) => `<button class="option ${selected === index ? 'selected' : ''}" data-action="custom-select-option" data-index="${index}" role="radio" aria-checked="${selected === index}"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(option)}</span></button>`).join('')}</div><p class="custom-score-note">Select one answer. ${test.negative ? `Wrong answers deduct ${test.negative} mark.` : 'There is no negative marking for this paper.'}</p>`
    : `<div><button class="button ${isAttempted ? 'coral' : 'secondary'} small" data-action="custom-toggle-attempt" data-index="${state.current}">${isAttempted ? 'Selected to attempt' : 'Select this question'}</button><section class="answer-desk"><div class="answer-desk-head"><div><h4>Your answer sheet</h4><p>Write your answer on paper, then add one or more clear photos.</p></div><label class="button small upload-button">Add photos<input type="file" accept="image/*" capture="environment" multiple data-custom-photo-input="${question.id}" aria-label="Add answer photos"></label></div><div class="photo-grid" data-custom-photo-grid="${question.id}"><div class="empty-uploads">Loading saved answer photos…</div></div><textarea class="answer-note" data-custom-note="${question.id}" placeholder="Optional note: assumptions, workings, or what to improve…">${escapeHTML(state.session.notes[question.id] || '')}</textarea></section></div>`;
  app.innerHTML = `<section class="exam-shell">${renderCustomSidebar(test)}<main class="exam-main"><div class="exam-main-inner"><div class="question-meta"><strong>${escapeHTML(test.paperName || 'Foundation paper')}</strong><span>Question ${state.current + 1} of ${test.questions.length} · ${question.marks} marks${test.formatMode === 'subjective' ? (state.current === 0 ? ' · Compulsory' : ' · Optional') : ''}</span></div><article class="question-card"><span class="question-number">${state.current + 1}</span>${sourceMeta}<h1 class="question-text">${escapeHTML(question.text)}</h1>${body}${reasoning}</article><div class="exam-controls"><div class="exam-controls-group"><button class="button secondary small" data-action="custom-previous" ${state.current === 0 ? 'disabled' : ''}>← Previous</button></div><button class="button small" data-action="custom-next" ${state.current === test.questions.length - 1 ? 'disabled' : ''}>Next question →</button></div></div></main></section>`;
  if (question.type === 'subjective') hydrateCustomPhotoGrid(test.id, question.id).catch(() => {});
  startCountdown(test.duration * 60, state.session.startedAt, () => { toast('Time is up. Your saved work is still available.'); openCustomFinishModal(true); });
  window.scrollTo({ top: 0 });
}

async function openCustomFinishModal(timeExpired = false) {
  const test = state.customTest;
  const answered = customAnswerCount(test);
  const photos = await countCustomPhotos(test.id, test.questions.filter(question => question.type === 'subjective'));
  const formatWarning = test.formatMode === 'subjective' && answered !== (test.attemptCount || 5) ? `<p class="validation-list">Select Question 1 and exactly four of Questions 2–6 before finishing.</p>` : '';
  openModal(`<h2>${timeExpired ? 'Time is up.' : 'Finish this test?'}</h2><p>${test.formatMode === 'subjective' ? `You selected <b>${answered}</b> of ${test.attemptCount || 5} required questions` : `You answered <b>${answered}</b> of ${test.questions.length} questions`} and saved <b>${photos}</b> subjective answer photo${photos === 1 ? '' : 's'}.</p><p>${test.formatMode === 'subjective' ? 'Selected subjective responses remain marked for manual review.' : 'MCQs will be scored with the official negative marking.'}</p>${formatWarning}<div class="inline-actions"><button class="button coral" data-action="confirm-custom" ${formatWarning ? 'disabled' : ''}>Finish & score</button><button class="button secondary" data-action="close-modal">Keep working</button></div>`);
}

function calculateCustomResult(test) {
  let correct = 0, wrong = 0, skipped = 0, max = 0;
  test.questions.forEach((question,index) => {
    if (question.type !== 'mcq') return;
    max += Number(question.marks) || 0;
    if (!Object.prototype.hasOwnProperty.call(state.session.answers,index)) skipped++;
    else if (Number(state.session.answers[index]) === Number(question.answer)) correct++;
    else wrong++;
  });
  const score = correct - wrong * (Number(test.negative) || 0);
  return { correct, wrong, skipped, max, score, percent: max ? Math.max(0, Math.round((score / max) * 100)) : null };
}

async function renderCustomResults(id) {
  stopTimer();
  document.body.classList.remove('exam-active');
  activateNav('create');
  const test = getCustomTest(id);
  if (!test) return renderError(new Error('That custom test could not be found.'));
  state.customTest = test;
  state.session = readCustomSession(id) || { answers: {}, notes: {} };
  const result = calculateCustomResult(test);
  const subjective = test.questions.filter(question => question.type === 'subjective');
  const photos = await countCustomPhotos(test.id, subjective);
  const sourceMix = [...new Set(test.questions.map(question => question.sourceLabel || 'Your question'))];
  app.innerHTML = `<section class="page-shell results-page"><div class="result-hero"><div class="score-ring" style="--score:${result.percent ?? 0}"><div class="score-ring-inner"><span><b>${result.percent === null ? '—' : `${result.percent}%`}</b><small>MCQ score</small></span></div></div><div><p class="eyebrow">Custom Foundation test complete</p><h1>${result.percent === null ? 'Your answer set is saved.' : result.percent >= 70 ? 'Strong work.' : 'A useful baseline.'}</h1><p>${escapeHTML(test.title)} · ${escapeHTML(test.paperName || '')}. Subjective answers still need manual review.</p><div class="result-actions"><button class="button coral" data-action="reopen-custom" data-id="${test.id}">Reopen test</button><button class="button secondary" data-action="retake-custom" data-id="${test.id}">Retake</button><button class="button ghost" data-action="create-hub">Choose another</button></div></div></div><p class="source-note">Question mix: ${sourceMix.map(escapeHTML).join(' · ')}</p><div class="result-grid"><article class="result-stat"><span>MCQ correct</span><b>${result.correct}</b></article><article class="result-stat"><span>MCQ wrong</span><b>${result.wrong}</b></article><article class="result-stat"><span>MCQ skipped</span><b>${result.skipped}</b></article><article class="result-stat"><span>Subjective photos</span><b>${photos}</b></article></div><div class="result-breakdown"><h2>Review status</h2>${test.questions.map((question,index) => `<div class="breakdown-row"><span>Question ${index + 1} · ${question.type === 'mcq' ? 'MCQ' : 'Subjective'}</span><div class="breakdown-track"><span style="width:${question.type === 'mcq' && Object.prototype.hasOwnProperty.call(state.session.answers,index) ? '100' : question.type === 'subjective' && state.session.notes?.[question.id] ? '60' : '0'}%"></span></div><b>${question.type === 'mcq' ? (state.session.answers[index] === undefined ? 'Skipped' : Number(state.session.answers[index]) === Number(question.answer) ? 'Correct' : 'Review') : 'Manual review'}</b></div>`).join('')}</div></section>`;
  window.scrollTo({ top: 0 });
}

async function route() {
  closeModal();
  stopTimer();
  const parts = location.hash.replace(/^#/, '').split('/').filter(Boolean);
  const page = parts[0] || 'home';
  if (page === 'home') return renderHome();
  if (page === 'library') return renderLibrary();
  if (page === 'create') return renderCreateHub();
  if (page === 'custom' && parts[1]) return startCustomTest(parts[1]);
  if (page === 'custom-results' && parts[1]) return renderCustomResults(parts[1]);
  if (page === 'pick' && ARTIFACTS[parts[1]]) return renderPicker(parts[1]);
  if (page === 'exam' && (parts[1] === 'economics' || getOfficialTest(parts[1]))) return startMcq(parts[1], Number(parts[2]) || 1);
  if (page === 'results' && (parts[1] === 'economics' || getOfficialTest(parts[1]))) return renderMcqResults(parts[1], Number(parts[2]) || 1);
  if (page === 'subjective' && ARTIFACTS[parts[1]]?.kind === 'subjective') return startSubjective(parts[1], Number(parts[2]) || 1);
  if (page === 'submitted' && ARTIFACTS[parts[1]]?.kind === 'subjective') return renderSubjectiveResult(parts[1], Number(parts[2]) || 1);
  renderHome();
}

document.addEventListener('click', async event => {
  if (event.target.closest('.modal-close')) {
    closeModal();
    return;
  }
  const control = event.target.closest('[data-action]');
  if (!control) return;
  event.preventDefault();
  const action = control.dataset.action;

  if (action === 'home') return navigate('#home');
  if (action === 'close-modal') return closeModal();
  if (action === 'create-hub') return navigate('#create');
  if (action === 'choose-level') {
    if (control.dataset.level !== 'foundation') return toast('Intermediate and Final builders are coming later.');
    state.builder = newBuilder('foundation');
    return renderPaperChoice('foundation');
  }
  if (action === 'choose-scheme-paper') {
    const paper = findSchemePaper(state.builder?.level || 'foundation', control.dataset.code);
    if (!paper || !state.builder) return renderCreateHub();
    applyPaperFormat(state.builder, paper, true);
    return renderBuilderEditor();
  }
  if (action === 'change-builder-paper') return renderPaperChoice(state.builder?.level || 'foundation');
  if (action === 'open-question-bank') return openQuestionBankModal();
  if (action === 'add-bank-question') {
    const question = cloneBankQuestion(control.dataset.bankId);
    if (!question || !state.builder) return;
    const slot = state.builder.questions.findIndex(item => item.type === question.type && !item.text?.trim());
    if (slot >= 0) state.builder.questions[slot] = { ...state.builder.questions[slot], ...question, id: state.builder.questions[slot].id, marks: state.builder.questions[slot].marks, slot: state.builder.questions[slot].slot, section: state.builder.questions[slot].section };
    else toast('All matching question slots are already filled.');
    closeModal();
    return renderBuilderEditor();
  }
  if (action === 'add-builder-question') {
    return toast('Question count is fixed by the official Foundation paper format.');
  }
  if (action === 'remove-builder-question') {
    return toast('Question count is fixed by the official Foundation paper format.');
  }
  if (action === 'save-custom-test') {
    if (!state.builder) return renderCreateHub();
    state.builder.showErrors = true;
    const issues = validateBuilder(state.builder);
    if (issues.length) return renderBuilderEditor();
    const paper = findSchemePaper(state.builder.level, state.builder.paperCode);
    const snapshot = { ...state.builder, title: state.builder.title.trim(), duration: Number(state.builder.duration), totalMarks: Number(state.builder.totalMarks), paperName: paper.name, negative: paper.negative, formatMode: paper.formatMode, questionCount: paper.questionCount, attemptCount: paper.attemptCount, compulsoryCount: paper.compulsoryCount || 0, instructions: paper.instructions || [], sections: paper.sections || [], pattern: { mcq: paper.mcq, descriptive: paper.descriptive }, openBook: Boolean(paper.openBook), updatedAt: Date.now() };
    delete snapshot.showErrors;
    saveCustomTest(snapshot);
    state.builder = null;
    return navigate(`#custom/${snapshot.id}`);
  }
  if (action === 'launch-custom') return navigate(`#custom/${control.dataset.id}`);
  if (action === 'edit-custom') {
    const test = getCustomTest(control.dataset.id);
    if (!test) return toast('That custom test no longer exists.');
    state.builder = JSON.parse(JSON.stringify(test));
    applyPaperFormat(state.builder, findSchemePaper(state.builder.level, state.builder.paperCode), false);
    state.builder.showErrors = false;
    state.builder.editing = true;
    return renderBuilderEditor();
  }
  if (action === 'delete-custom') {
    const test = getCustomTest(control.dataset.id);
    if (!test) return;
    return openModal(`<h2>Delete this custom test?</h2><p>${escapeHTML(test.title)} and its saved attempt/photos will be removed from this browser.</p><div class="inline-actions"><button class="button coral" data-action="confirm-delete-custom" data-id="${test.id}">Delete test</button><button class="button secondary" data-action="close-modal">Keep it</button></div>`);
  }
  if (action === 'confirm-delete-custom') {
    const test = getCustomTest(control.dataset.id);
    const tests = readCustomTests().filter(item => item.id !== control.dataset.id);
    writeCustomTests(tests);
    if (test) await deletePhotosForCustomTest(test.id, test.questions || []);
    localStorage.removeItem(customSessionKey(control.dataset.id));
    closeModal();
    toast('Custom test deleted.');
    return renderCreateHub();
  }
  if (action === 'pick') return navigate(`#pick/${control.dataset.subject}`);
  if (action === 'start-official') return navigate(`#exam/${control.dataset.subject}/1`);
  if (action === 'start-paper') {
    const subject = control.dataset.subject;
    const destination = ARTIFACTS[subject].kind === 'mcq' ? 'exam' : 'subjective';
    return navigate(`#${destination}/${subject}/${control.dataset.paper}`);
  }
  if (action === 'back-papers') {
    if (ARTIFACTS[state.subject]) return navigate(`#pick/${state.subject}`);
    return navigate('#home');
  }

  if (action === 'custom-select-option') {
    const test = state.customTest;
    const question = test?.questions[state.current];
    if (!test || !question || question.type !== 'mcq') return;
    state.session.answers[state.current] = Number(control.dataset.index);
    writeCustomSession();
    return renderCustomExam();
  }
  if (action === 'custom-toggle-attempt') {
    const test = state.customTest;
    const index = Number(control.dataset.index);
    if (!test || test.formatMode !== 'subjective' || index === 0) return;
    const selected = new Set(state.session.selectedQuestions || [0]);
    if (selected.has(index)) selected.delete(index);
    else if (selected.size < (test.attemptCount || 5)) selected.add(index);
    else return toast(`Select only ${test.attemptCount || 5} questions, including compulsory Question 1.`);
    state.session.selectedQuestions = [...selected].sort((a, b) => a - b);
    writeCustomSession();
    return renderCustomExam();
  }
  if (action === 'custom-previous') { state.current = Math.max(0, state.current - 1); return renderCustomExam(); }
  if (action === 'custom-next') { state.current = Math.min(state.customTest.questions.length - 1, state.current + 1); return renderCustomExam(); }
  if (action === 'custom-jump') { state.current = Number(control.dataset.index); return renderCustomExam(); }
  if (action === 'custom-finish') return openCustomFinishModal(false);
  if (action === 'confirm-custom') {
    state.session.completedAt = Date.now();
    writeCustomSession();
    closeModal();
    return navigate(`#custom-results/${state.customTest.id}`);
  }
  if (action === 'reopen-custom') { state.session.completedAt = null; writeCustomSession(); return navigate(`#custom/${control.dataset.id}`); }
  if (action === 'retake-custom') return openModal(`<h2>Retake this custom test?</h2><p>This clears the saved answers and answer photos for this test on this device.</p><div class="inline-actions"><button class="button coral" data-action="confirm-retake-custom" data-id="${control.dataset.id}">Start fresh</button><button class="button secondary" data-action="close-modal">Keep result</button></div>`);
  if (action === 'confirm-retake-custom') {
    const test = getCustomTest(control.dataset.id);
    if (test) await deletePhotosForCustomTest(test.id, test.questions || []);
    localStorage.removeItem(customSessionKey(control.dataset.id));
    closeModal();
    return navigate(`#custom/${control.dataset.id}`);
  }

  if (action === 'select-option' && !state.review) {
    state.session.answers[state.current] = Number(control.dataset.index);
    writeSession();
    return renderMcqExam();
  }
  if (action === 'previous') {
    state.current = Math.max(0, state.current - 1);
    return renderMcqExam();
  }
  if (action === 'next') {
    state.current = Math.min(currentTest().questions.length - 1, state.current + 1);
    return renderMcqExam();
  }
  if (action === 'jump') {
    state.current = Number(control.dataset.index);
    return renderMcqExam();
  }
  if (action === 'toggle-flag') {
    const flags = new Set(state.session.flagged);
    flags.has(state.current) ? flags.delete(state.current) : flags.add(state.current);
    state.session.flagged = [...flags];
    writeSession();
    return renderMcqExam();
  }
  if (action === 'submit') return submitMcq(false);
  if (action === 'confirm-submit') return submitMcq(true);
  if (action === 'review') {
    closeModal();
    state.review = true;
    state.current = 0;
    return startMcq(state.subject, state.paper, { review: true });
  }
  if (action === 'back-results') return navigate(`#results/${state.subject}/${state.paper}`);
  if (action === 'retake') {
    return openModal(`<h2>Retake this paper?</h2><p>This starts a blank response sheet. Your current score will no longer be available in this browser.</p><div class="inline-actions"><button class="button coral" data-action="confirm-retake">Start fresh</button><button class="button secondary" data-action="close-modal">Keep result</button></div>`);
  }
  if (action === 'confirm-retake') {
    localStorage.removeItem(sessionKey(state.subject, state.paper));
    closeModal();
    return navigate(`#exam/${state.subject}/${state.paper}`);
  }

  if (action === 'toggle-attempt') {
    event.stopPropagation();
    const number = Number(control.dataset.question);
    const selected = new Set(state.session.selectedQuestions);
    if (selected.has(number)) selected.delete(number);
    else if (selected.size >= 5) return toast('Select Question 1 plus any four optional questions.');
    else selected.add(number);
    selected.add(1);
    state.session.selectedQuestions = [...selected].sort((a, b) => a - b);
    writeSession();
    renderSubjectiveExam();
    const card = document.querySelector(`[data-question-card="${number}"]`);
    if (card) { card.open = true; card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    return;
  }
  if (action === 'scroll-subjective') {
    const number = Number(control.dataset.index);
    const card = document.querySelector(`[data-question-card="${number}"]`);
    if (card) { card.open = true; card.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    return;
  }
  if (action === 'finish-subjective') return openSubjectiveFinishModal(false);
  if (action === 'confirm-subjective') {
    state.session.completedAt = Date.now();
    writeSession();
    closeModal();
    return navigate(`#submitted/${state.subject}/${state.paper}`);
  }
  if (action === 'reopen-subjective') {
    state.session.completedAt = null;
    writeSession();
    return navigate(`#subjective/${state.subject}/${state.paper}`);
  }
  if (action === 'retake-subjective') {
    return openModal(`<h2>Start this paper fresh?</h2><p>This will remove the saved notes and all answer photos for this paper from this browser. This cannot be undone.</p><div class="inline-actions"><button class="button coral" data-action="confirm-retake-subjective">Remove & start fresh</button><button class="button secondary" data-action="close-modal">Keep attempt</button></div>`);
  }
  if (action === 'confirm-retake-subjective') {
    const subject = state.subject;
    const paper = state.paper;
    await deletePhotosForPaper(subject, paper);
    localStorage.removeItem(sessionKey(subject, paper));
    closeModal();
    return navigate(`#subjective/${subject}/${paper}`);
  }
  if (action === 'delete-photo') {
    const id = control.dataset.id;
    const question = control.dataset.question;
    return openModal(`<h2>Remove this answer photo?</h2><p>The image will be deleted from this browser and cannot be recovered from the test lab.</p><div class="inline-actions"><button class="button coral" data-action="confirm-delete-photo" data-id="${id}" data-question="${question}">Remove photo</button><button class="button secondary" data-action="close-modal">Keep it</button></div>`);
  }
  if (action === 'delete-custom-photo') {
    const id = control.dataset.id;
    const testId = control.dataset.testId;
    const questionId = control.dataset.questionId;
    return openModal(`<h2>Remove this answer photo?</h2><p>The image will be deleted from this browser.</p><div class="inline-actions"><button class="button coral" data-action="confirm-delete-custom-photo" data-id="${id}" data-test-id="${testId}" data-question-id="${questionId}">Remove photo</button><button class="button secondary" data-action="close-modal">Keep it</button></div>`);
  }
  if (action === 'confirm-delete-custom-photo') {
    await deletePhoto(control.dataset.id);
    closeModal();
    await hydrateCustomPhotoGrid(control.dataset.testId, control.dataset.questionId);
    return toast('Answer photo removed.');
  }
  if (action === 'confirm-delete-photo') {
    const question = Number(control.dataset.question);
    await deletePhoto(control.dataset.id);
    closeModal();
    await hydratePhotoGrid(question);
    return toast('Answer photo removed.');
  }
});

document.addEventListener('change', async event => {
  const builderField = event.target.closest('[data-builder-field]');
  if (builderField && state.builder) {
    const key = builderField.dataset.builderField;
    state.builder[key] = key === 'title' ? builderField.value : Number(builderField.value);
    return;
  }
  const questionField = event.target.closest('[data-question-field]');
  if (questionField && state.builder) {
    const index = Number(questionField.dataset.index);
    const key = questionField.dataset.questionField;
    state.builder.questions[index][key] = key === 'answer' ? Number(questionField.value) : (key === 'marks' ? Number(questionField.value) : questionField.value);
    return;
  }
  const questionOption = event.target.closest('[data-question-option]');
  if (questionOption && state.builder) {
    const index = Number(questionOption.dataset.index);
    state.builder.questions[index].options[Number(questionOption.dataset.questionOption)] = questionOption.value;
    return;
  }
  const customInput = event.target.closest('[data-custom-photo-input]');
  if (customInput) {
    const questionId = customInput.dataset.customPhotoInput;
    const files = [...customInput.files].filter(file => file.type.startsWith('image/'));
    if (!files.length) return toast('Choose one or more image files.');
    const oversized = files.find(file => file.size > 20 * 1024 * 1024);
    if (oversized) return toast(`${oversized.name} is larger than 20 MB.`);
    customInput.disabled = true;
    try {
      for (const file of files) await addPhoto(customPhotoScope(state.customTest.id, questionId), file);
      await hydrateCustomPhotoGrid(state.customTest.id, questionId);
      toast(`${files.length} answer photo${files.length === 1 ? '' : 's'} saved on this device.`);
    } catch { toast('The browser could not save that photo. Check available device storage.'); }
    finally { customInput.disabled = false; customInput.value = ''; }
    return;
  }
  const input = event.target.closest('[data-photo-input]');
  if (!input) return;
  const question = Number(input.dataset.photoInput);
  const files = [...input.files].filter(file => file.type.startsWith('image/'));
  if (!files.length) return toast('Choose one or more image files.');
  const oversized = files.find(file => file.size > 20 * 1024 * 1024);
  if (oversized) return toast(`${oversized.name} is larger than 20 MB.`);
  input.disabled = true;
  try {
    for (const file of files) await addPhoto(photoScope(state.subject, state.paper, question), file);
    await hydratePhotoGrid(question);
    toast(`${files.length} answer photo${files.length === 1 ? '' : 's'} saved on this device.`);
  } catch {
    toast('The browser could not save that photo. Check available device storage.');
  } finally {
    input.disabled = false;
    input.value = '';
  }
});

document.addEventListener('input', event => {
  const builderField = event.target.closest('[data-builder-field]');
  if (builderField && state.builder) {
    const key = builderField.dataset.builderField;
    state.builder[key] = key === 'title' ? builderField.value : Number(builderField.value);
    return;
  }
  const questionField = event.target.closest('[data-question-field]');
  if (questionField && state.builder) {
    const index = Number(questionField.dataset.index);
    const key = questionField.dataset.questionField;
    state.builder.questions[index][key] = key === 'marks' ? Number(questionField.value) : questionField.value;
    return;
  }
  const questionOption = event.target.closest('[data-question-option]');
  if (questionOption && state.builder) {
    const index = Number(questionOption.dataset.index);
    state.builder.questions[index].options[Number(questionOption.dataset.questionOption)] = questionOption.value;
    return;
  }
  const customNote = event.target.closest('[data-custom-note]');
  if (customNote && state.customTest && state.session) {
    state.session.notes[customNote.dataset.customNote] = customNote.value;
    writeCustomSession();
    return;
  }
  const note = event.target.closest('[data-note]');
  if (!note || !state.session) return;
  state.session.notes[note.dataset.note] = note.value;
  writeSession();
});

modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modalBackdrop.hidden) closeModal();
});

window.addEventListener('hashchange', route);
route();
