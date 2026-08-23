# Foundation Test Lab

A private CA Foundation practice environment: timed MCQ mocks, full-length
descriptive papers with photo answer sheets, the official ICAI PDFs, and a
builder for your own tests.

## Open it

**<https://vvvaibhaverma-123459876.github.io/ca-foundation-test-lab/>**

Nothing to install, no account, no sign-in. Open the link on a laptop or a
phone and start a paper. Once the page has loaded it keeps working without
internet — only the official PDFs in the source library need a connection.

New here? The **Help** tab explains everything in plain words, including how to
back your work up.

## What you should know

**Your work stays on your device.** Answers, notes, custom tests, and answer
photos are stored inside the browser you are using. Nothing is uploaded, which
keeps it private — and also means it does not travel with you. It is lost if you
clear your browsing data, switch browsers or phones, or use a private window.

**So save a backup file now and then.** Help → *Save a backup file* writes
everything into one file you can keep in your email or cloud drive and restore
on any device.

**The clock only runs while a paper is open in front of you.** Close the tab,
take a call, come back tomorrow — your remaining time is exactly where you left
it. Use *Pause paper* for a deliberate break; it stops the clock and covers the
questions. Unfinished papers wait for you at the top of the Practice tab.

**Frenzy is for the ten minutes you didn't plan for.** Mixed questions from every
topic, thirty seconds each, three lives, a streak multiplier and a daily target.
It weights questions toward the topics your past papers and past runs show you
are weakest in, so a short run is still aimed revision rather than a shuffle.

**Wrong answers can explain themselves.** Papers 3 and 4 ship with an answer key
and no reasons. Add a [Claude API key](https://console.anthropic.com/settings/keys)
once under Help — either paste it, or point the lab at an env file such as
`ai.env` and it reads the Anthropic key out of it, ignoring every other secret
in that file — and any MCQ will tell you, in three short lines, why the right
answer is right, what the specific confusion behind your answer was, and the one
rule worth memorising. Each explanation is saved on your device, so you never pay
for the same question twice and can re-read it offline. The key stays in your
browser, is sent to nothing but Anthropic's API, and is deliberately kept out of
the backup file — which does mean each device needs the key set once. Everything
else in the lab works without it.

**Answering with a keyboard is faster.** Press <kbd>A</kbd>–<kbd>D</kbd> to
choose an answer, <kbd>&rarr;</kbd> and <kbd>&larr;</kbd> to move through the
paper, <kbd>M</kbd> to mark a question for review, <kbd>G</kbd> for the question
grid, <kbd>K</kbd> to pause, and <kbd>?</kbd> for the full list. On a phone, the
bar at the bottom of a paper holds the question grid, pause, and submit.

## What is inside

| | |
|---|---|
| Paper 1 · Accounting | 10 descriptive mocks · 3 hours · photo answer sheets |
| Paper 2 · Business Laws | 10 descriptive mocks · 3 hours · photo answer sheets |
| Paper 3 · Quantitative Aptitude | 100-MCQ full-format mock · 2 hours · +1 / −0.25 |
| Paper 4 · Business Economics | 10 mocks of 100 MCQs · 2 hours · +1 / −0.25 |
| Source library | Six official ICAI PDFs, kept exactly as supplied |
| Create test | Build your own paper in the current ICAI Foundation format |
| Frenzy | Mixed-topic rapid MCQs, weighted toward your weak topics |

The **Create test** workspace covers CA Foundation Papers 1–4 and locks each
paper to the current ICAI format: Papers 1–2 use six 20-mark descriptive
questions (Question 1 compulsory, attempt any four of Questions 2–6), while
Papers 3–4 use 100 one-mark MCQs in two hours with 0.25 negative marking.
Intermediate and Final builder levels are reserved for a later release.

The Quantitative Aptitude full-format mock contains 100 MCQs: the 30 questions
generated through the Anthropic question-setter pipeline are followed by 70
deterministic verified questions. The API-generated set is stored as a static,
key-free JSON asset for GitHub Pages.

## Nightly Claude paper publishing

The repository includes a single-provider pipeline in
scripts/generate-daily-papers.mjs. It creates five Foundation papers per
batch: one Accounting paper, one Business Laws paper, one Quantitative Aptitude
paper, one Business Economics paper, and one rotating extra paper. Papers 1
and 2 follow the six-question descriptive format; Papers 3 and 4 contain 100
MCQs with answer keys, concise reasoning, and verification metadata for every
question. The generated JSON is also rendered into the static HTML files that
the interactive app loads, so the browser does not need an API or question-bank
service.

.github/workflows/generate-daily-papers.yml runs at 11:00 PM India time
(17:30 UTC), validates the response, commits the new static files, and lets
GitHub Pages publish them. It also supports Run workflow for a manual test.
Add ANTHROPIC_API_KEY under the repository's GitHub Settings -> Secrets and
variables -> Actions before the first run; never commit the key or put it in
the site. The local equivalent is:

    & 'C:\Program Files\nodejs\node.exe' scripts/generate-daily-papers.mjs

The workflow intentionally has no push trigger, so its own generated commit
cannot start an infinite loop. GitHub may start scheduled jobs a few minutes
after the cron time during high load.

The builder also includes a labelled mixed bank: paraphrased ICAI past-paper and
RTP themes, institution-neutral coaching-style prompts, and generated questions.
Generated questions carry answer reasoning and verification checks, and the
builder blocks a generated question that has not passed those checks. Coaching
material is represented as original or paraphrased practice unless you supply an
institution's licensed source.

## Running it on your own machine

Not needed to use the lab — the link above is the same site. This is only for
editing the code.

The site is plain HTML, CSS, and JavaScript with no build step and no
dependencies. Serve the folder over HTTP (opening `index.html` straight from
disk will not work, because the mock papers are fetched from `data/`):

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. To use it from a phone on the same Wi-Fi, use
the computer's LAN address instead of `localhost`, for example
`http://192.168.1.9:4173`, and allow the connection if the firewall asks.

### Layout

- `index.html` — the shell: header, nav, live region, and modal host.
- `app.js` — router, exam engine, timer, question bank, builder, frenzy mode,
  explanations, backup/restore.
- `styles.css` — all styling, including the phone and print layouts.
- `data/` — the mock papers, parsed at runtime.
- `assets/pdfs/` — the official ICAI source PDFs.

To regenerate the 30-question Paper 3 API set locally, keep `ANTHROPIC_API_KEY`
in `C:\Users\vvvai\.secrets\ai.env` (or set `CA_LAB_ENV`) and run:

```powershell
& 'C:\Program Files\nodejs\node.exe' scripts/generate-quantitative.mjs
```
