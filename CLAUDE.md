# Agency AI Toolkit

A toolkit that makes Claude useful for a digital agency: website audits and lead reports for prospects.

## Structure
- `mcp-server/`: MCP server (TypeScript) with two tools: `website_check` and `marketing_scan`
- `.claude/skills/website-audit/`: skill for a client-ready audit
- `.claude/skills/lead-scoring/`: skill for a lead score out of 100 + proposal (`template.html`, `diensten.md`)
- `.claude/commands/`: slash commands `/audit` and `/lead`
- `templates/laravel/CLAUDE.md`: template for Laravel client projects
- `voorbeelden/`: example output
- `rapporten/`: generated reports (not in Git)

## Commands
- Build the MCP server: `cd mcp-server && npm install && npm run build`
- Test the MCP server: `cd mcp-server && npm run inspect`

## Conventions
- All output for clients is in Dutch, in plain language and positive in tone.
- Only use what the tools measured; never invent figures or prices.
- New detection rules go in `mcp-server/src/marketingScan.ts`; the interpretation (score, opportunities) belongs in the skill, not in the code.
- Never use `console.log` in the MCP server: stdout is the MCP channel. Debug via `console.error`.

## Security
- Only public http(s) URLs; localhost and private IP ranges are blocked.
- Timeouts (10 s page, 5 s extra files) and a 5 MB limit stay in place.
- No API keys, no data storage, read-only.
