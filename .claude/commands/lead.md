---
description: Score a prospect out of 100 and make a lead report with a proposal
argument-hint: <domein of url>
---

Make a lead report for: $ARGUMENTS

Use the `lead-scoring` skill. Run `website_check` and `marketing_scan`, calculate the score with the scoring model and fill in the skill's `template.html`. Save the result as `rapporten/lead-rapport-[domein].html`.

Then finish with:
- the score and the label (hot, warm or cold),
- the 3 biggest opportunities in one line each,
- the path to the report, so the user can open it and save it as a PDF.
