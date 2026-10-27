---
name: laravel-setup
description: Set up a new Laravel client project fully automatically after a short intake (client, name, goal, scope, frontend, integrations, languages). Use when someone wants to start a new Laravel project, says "/nieuw-project", or asks to scaffold a Laravel app for a client. Requires a shell (Claude Code).
---

# Laravel project setup

You act like a technical project lead at a digital agency: first a short intake, then you set up a clean, consistent Laravel project that every colleague can start on straight away.

This skill needs a terminal (Claude Code, or the Code tab in the Claude app). Without a shell: say so, and give the intake + the commands as a checklist.

## Step 1: Check the tools

Run `php -v`, `composer -V` and `node -v`.
- PHP ≥ 8.2, Composer and Node.js are required.
- Something missing on macOS? Suggest `brew install php composer node` and **only run it after explicit approval**.

## Step 2: Intake (in Dutch)

Ask the questions in **2 rounds**, with multiple choice where possible (AskUserQuestion if available). Suggest sensible defaults so the user can confirm quickly.

**Round 1: project**
1. Klantnaam (client name)
2. Projectnaam: suggest a slug, e.g. `bakkerij-peeters-bestellingen`
3. Type: website · webapplicatie / klantenportaal · webshop · API / backend
4. Doel in 1–2 zinnen (goal in 1–2 sentences): what should it achieve for the client?

**Round 2: content and technology**
5. Belangrijkste functionaliteiten (scope): 3–6 short points
6. Gebruikers en rollen (users and roles): login needed? which roles (e.g. admin, klant, medewerker)?
7. Frontend: **Livewire (recommended)** · Vue (Inertia) · React (Inertia) · API only
8. Koppelingen (integrations, multiple answers allowed): Odoo · Teamleader · Mollie · Mailchimp · other · none
9. Talen (languages): NL · FR · EN (multiple answers allowed; first = default language)
10. Deadline / opleverdatum and contact person at the agency
11. Map (folder): where should the project go? Default `~/Documents/GitHub`

Then show **a short summary** and ask for confirmation before you build anything.

## Step 3: Build

Work in this order. After each step: does it work? If not, stop, explain the error and propose a fix.

1. **Check the folder**: if `<map>/<slug>` already exists, stop and ask for another name. Never overwrite anything.
2. **Create the project** with the matching starter kit:
   - Livewire → `composer create-project laravel/livewire-starter-kit <slug>`
   - Vue → `composer create-project laravel/vue-starter-kit <slug>`
   - React → `composer create-project laravel/react-starter-kit <slug>`
   - API only → `composer create-project laravel/laravel <slug>`, then `php artisan install:api`
   - If a starter kit isn't available: fall back to `laravel/laravel` and tell the user.
3. **.env**: `APP_NAME="<Klant> – <Project>"`, `APP_LOCALE` = default language, `APP_FALLBACK_LOCALE=en`. Keep SQLite locally (Laravel default); note the production database in PROJECT.md.
4. **Languages**: `php artisan lang:publish`; create `lang/<taal>.json` for every chosen language (can be empty `{}`).
5. **Roles** (if login + roles): add a `role` column to users via a new migration, an enum `app/Enums/Role.php`, and a `User::hasRole()` helper. Keep it simple; no extra package.
6. **Integrations**: for each one, a client class in `app/Services/<Naam>/<Naam>Client.php` (see `service-stub.php` in this folder), an entry in `config/services.php` and empty keys in `.env.example` **and** `.env`. Never fill in real keys.
7. **CLAUDE.md**: copy `CLAUDE.template.md` from this skill folder to the project root and fill in all `[…]` fields with the intake answers.
8. **PROJECT.md**: create a project brief from `PROJECT.template.md` (in this folder) with all intake answers + open questions.
9. **Install & check**: `npm install && npm run build` (when there's a frontend), `php artisan migrate`, `php artisan test`.
10. **Git**: `git init`, `git add .`, `git commit -m "chore: projectopzet via /nieuw-project"`.

## Step 4: Wrap up (in Dutch)

Give a short summary:
- where the project is and how to start it (`composer run dev`)
- what was set up (starter kit, roles, integrations, languages)
- the result of the tests
- 3 concrete next steps based on the scope (e.g. "Maak het model en de migration voor Bestelling")

## Rules

- Never overwrite existing folders or files without asking.
- Install system software (brew) only after approval.
- No secrets in code or Git; only empty keys in `.env.example`.
- Change nothing outside the new project folder.
