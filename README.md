# Agency AI Toolkit

An AI toolkit for digital agencies, built on Claude. Type one command and you get:

- **`/audit klant.be`**: a client-ready website audit with the top 3 issues and quick wins
- **`/lead prospect.be`**: a **lead report with a score out of 100**: how interesting the company is as a client, which opportunities there are, and a proposal in 3 phases, as a styled document you can save as a PDF straight away
- **`/ship`** (or `/ship pr`): checks for secrets and failing tests, writes a clear commit message, commits and pushes to GitHub, optionally as a pull request, without a terminal or GitHub Desktop
- **`/nieuw-project`**: Claude runs a short intake (client, goal, scope, roles, frontend, integrations, languages) and **sets up a complete Laravel project automatically**: starter kit, roles, service classes for Odoo/Teamleader/Mollie, CLAUDE.md, project brief, tests and the first Git commit

👉 Example: [`voorbeelden/lead-rapport-voorbeeld.html`](voorbeelden/lead-rapport-voorbeeld.html) (fictional company)

## What's in it

| Part | What it does |
|---|---|
| **MCP server** (`mcp-server/`) | Gives Claude two tools: `website_check` (SEO basics, speed) and `marketing_scan` (CMS, tracking, ad pixels, cookie banner, lead flow, socials, GEO readiness) |
| **Skill: website-audit** | Turns the check into a clear audit for the client |
| **Skill: lead-scoring** | Scoring model out of 100 across 4 categories, links opportunities to the agency's services and fills in an HTML report |
| **Skill: laravel-setup** | Intake in 2 rounds, then a project setup according to the agency standard, including a project brief (`PROJECT.md`) and integration stubs |
| **Commands** | `/audit`, `/lead`, `/nieuw-project` and `/ship`: the whole workflow in one command, the same for every team member |
| **Laravel template** | `templates/laravel/CLAUDE.md`: agreements for AI-assisted work on Laravel client projects |

## How it works

```
/lead prospect.be
   │
   ▼
Claude ──▶ website_check  ─┐
       ──▶ marketing_scan ─┤  (MCP server: reads the public homepage)
                           ▼
   lead-scoring skill: scoring model + services list + template
                           ▼
   rapporten/lead-rapport-prospect.be.html  →  Cmd + P  →  PDF
```

**Lead score (100)** = growth potential (40) + fit with the agency (25) + budget signals (20) + timing (15).
75+ = hot lead · 50–74 = warm lead · < 50 = cold lead. The full model is in [`SKILL.md`](.claude/skills/lead-scoring/SKILL.md).

## Installation

Requires Node.js 18+ and [Claude Code](https://docs.claude.com/en/docs/claude-code). For `/nieuw-project` you also need PHP 8.2+ and Composer (`brew install php composer`).

```bash
git clone https://github.com/ArneH97/agency-ai-toolkit.git
cd agency-ai-toolkit/mcp-server && npm install && npm run build && cd ..
claude
```

Claude Code automatically picks up the MCP server (`.mcp.json`), the skills and the commands from this folder. Approve the MCP server the first time, then type `/lead voorbeeld.be`.

**Adapting to your own agency:** edit `diensten.md` (services) and the `--accent` colour in `template.html`.

## Security
Only public websites, no internal addresses, timeouts and size limits, no API keys and no data storage.

---
Built by Arne Halsberghe with Claude Code.
