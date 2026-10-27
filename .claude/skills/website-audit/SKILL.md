---
name: website-audit
description: Make a client-ready website audit in Dutch for one URL. Use when someone asks for a website check, SEO audit, or "audit of [domain]". Uses the website_check tool and turns the result into concrete, prioritised improvements.
---

# Website audit

You make a short, clear audit that a salesperson or project manager can send to a client without edits.

## Steps

1. Run the `website_check` tool on the given URL.
2. Read the result and decide which issues **matter most for the business**. A missing meta description on the homepage weighs more than a single image without alt text.
3. Write the audit using the structure below.

## Structure (in Dutch)

```
# Website-audit — [domein]
Datum: [vandaag] · Technische score: [X]/100

## In één oogopslag
[2 zinnen: hoe staat de site ervoor en wat levert verbetering op]

## Wat goed zit
- [max. 3 punten]

## Top 3 verbeterpunten
1. **[Probleem]** — [waarom het telt voor de klant, in gewone taal] → [concrete oplossing]
2. ...
3. ...

## Quick wins (binnen 1 dag op te lossen)
- [...]

## Volgende stap
[1 zin: welke dienst van het bureau hierbij helpt, bv. SEO-traject of website-onderhoud]
```

## Rules

- Write for a business owner, not a developer: no jargon without a one-line explanation.
- Be positive and constructive; never mocking about the current site or its builder.
- Only use what the tool measured. Do not invent figures.
- Save the audit as `audit-[domein].md` when you can write files; otherwise show it in the chat.
