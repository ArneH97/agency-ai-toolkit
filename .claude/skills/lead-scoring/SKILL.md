---
name: lead-scoring
description: Score a company's website as a potential agency client (score out of 100) and make a styled prospect report with opportunities and a proposal. Use when someone asks for a lead score, prospect analysis, "how interesting is [domain] as a client" or a proposal for a prospect.
---

# Lead scoring & proposal

You assess how interesting a company is as a client for a digital agency, and turn that into a report that sales can use straight away, either as call preparation or as an attachment for the prospect.

## Steps

1. Run **both** tools on the URL: `website_check` and `marketing_scan`.
2. Score the lead with the scoring model below. Write down for yourself, per criterion, how many points and why.
3. Link every opportunity to a service from `diensten.md` (in this skill folder).
4. Fill in `template.html` (in this skill folder): replace every `{{…}}` placeholder and remove the comments.
5. Save the result as `lead-rapport-[domein].html`. The user opens it in a browser and saves it as a PDF with Cmd + P.
   Can't write files? Then show the same content in the chat in Markdown.

## Scoring model (total 100)

A high score = **a lot of growth potential + a good fit + signs of budget**. It's not a judgement of how good the site is.
Partial scores are allowed when a criterion is partly met (e.g. 2 of 5); give the reason in one line per category in the report.
For `{{BUREAU}}`, use the agency name the user gives; if none is given, write "ons bureau" ("our agency").

### A. Growth potential — max. 40
| Criterion | Points |
|---|---|
| SEO score from website_check: < 50 → 10 · 50–79 → 6 · ≥ 80 → 2 | 0–10 |
| No Google Analytics 4 or Tag Manager | 6 |
| No ad pixel (Meta, LinkedIn, Google Ads) | 6 |
| No structured data and no llms.txt (GEO opportunity) | 4 |
| No blog / content | 4 |
| No booking button, chat or form (weak lead flow) | 5 |
| Outdated: copyright ≥ 2 years old or no HTTPS | 5 |

### B. Fit with the agency — max. 25
| Criterion | Points |
|---|---|
| Platform: WordPress / WooCommerce / Odoo / Laravel → 8 · Wix / Squarespace / other (rebuild opportunity) → 5 · unknown → 4 | 4–8 |
| Business model that generates leads or sales (B2B service, webshop, booking) | 0–7 |
| Number of applicable services: ≥ 4 → 10 · 2–3 → 6 · 1 → 3 | 3–10 |

### C. Signs of budget and maturity — max. 20
| Criterion | Points |
|---|---|
| Already invests in marketing (ad pixel or tracking present) | 5 |
| Multilingual or webshop | 5 |
| Active on ≥ 2 social channels | 5 |
| Professional basics (contact details, forms, cookie banner) | 5 |

### D. Timing and urgency — max. 15
| Criterion | Points |
|---|---|
| Site visibly outdated (copyright ≥ 2 years old) | 5 |
| Tracking without a cookie banner (GDPR risk) | 5 |
| Slow or heavy (> 1.5 s or > 500 KB) or mobile issues | 5 |

### Label
- **75–100: Hot lead.** Contact them soon, with a proposal.
- **50–74: Warm lead.** Interesting; start with a free scan or audit.
- **< 50: Cold lead.** Little need or little fit; keep an eye on them.

## Writing rules

- Write in Dutch, for a business owner: concrete, positive, no jargon without explanation.
- Only use what the tools measured. "Not detected" ≠ "not present": phrase it as "op de homepage vonden we geen…" ("on the homepage we found no…").
- Opportunities are always framed as **what it delivers for the business** (more leads, better measurement, being found in AI search), not as an error.
- Proposal in 3 phases: **Quick wins** (≤ 2 weeks), **Groei** (1–3 months), **Systemen** (structural, e.g. CRM or automation).
- Never invent prices; write "op offerte" ("on quote") unless the user gives prices.
- Always end with 3 conversation points for the sales call.
