# Foundation Test Lab

A private, browser-based CA Foundation practice environment built from the supplied mock-series artifacts and official PDFs.

## Run locally

```powershell
& 'C:\Program Files\nodejs\node.exe' server.mjs
```

Then open [http://localhost:4173](http://localhost:4173).

Live GitHub Pages site: https://vvvaibhaverma-123459876.github.io/ca-foundation-test-lab/

For an iPhone or another device on the same Wi‑Fi, open the LAN address printed by the server, for example `http://192.168.1.9:4173`. `localhost` only works on the computer that is running the server. If Windows Firewall asks, allow Node.js on Private networks.

Responses, notes, and uploaded answer photos are stored only in the current browser profile. There is no server-side database or external upload.

The **Create test** workspace currently supports CA Foundation Papers 1–4. Choose the official paper pattern, set a practice duration, add MCQs and/or subjective questions, then run the saved test. MCQs are scored automatically; subjective questions include local answer-photo uploads and notes. Intermediate and Final builder levels are intentionally reserved for a later release.

The builder also includes a labelled mixed bank: paraphrased ICAI past-paper/RTP themes, institution-neutral coaching-style prompts, and generated questions. Generated questions carry answer reasoning and verification checks; the builder blocks a generated question that has not passed those checks. Coaching material is represented as original/paraphrased practice unless the user supplies an institution’s licensed source.
