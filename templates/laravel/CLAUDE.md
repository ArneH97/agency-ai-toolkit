# CLAUDE.md template — Laravel client project

> Copy this file to the root of a new Laravel project and fill in the `[…]` fields.
> This way every developer and every AI session works by the same agreements.

## Project
- Client: [name] · Project: [short description]
- Contact person (agency): [name] · Live URL: [url] · Staging: [url]

## Stack
- Laravel [version] · PHP [version] · Database: [MySQL/PostgreSQL]
- Frontend: [Blade + Livewire / Inertia + Vue / API + separate frontend]
- Integrations: [e.g. Odoo, Teamleader, Mollie, Mailchimp]

## Commands
- Install: `composer install && npm install && cp .env.example .env && php artisan key:generate`
- Develop: `php artisan serve` + `npm run dev`
- Database: `php artisan migrate --seed`
- Tests: `php artisan test`
- Code style: `./vendor/bin/pint`

## Conventions
- Business logic in **Actions/Services**, not in controllers; controllers stay thin.
- Validation via **Form Requests**, never inline in the controller.
- Database changes only via **migrations**; never edit an existing migration that is already live — make a new one.
- Use **Eloquent relationships** and eager loading (`with()`) to avoid N+1 queries.
- External integrations (CRM/ERP) in their own `app/Services/<Name>` class with a clear interface, so they can be tested and swapped.
- Translations via `lang/` files; client-facing texts never hard-coded.
- Every new feature gets at least one feature test.

## Security (non-negotiable)
- Never put secrets in code or commits: everything via `.env`; `.env` is not in Git.
- Always mass assignment via `$fillable`; never `$guarded = []`.
- Authorisation via **Policies/Gates**; check it in every controller action.
- No raw SQL with user input; use query builder bindings.
- Validate and limit uploads (type, size); store them outside `public/`.

## Workflow with AI
- First a short plan, then build in small steps; after each step `php artisan test`.
- Leave `composer.json` and migrations of existing tables alone without asking.
- When in doubt about client logic: ask, don't guess.
- Commit messages: `type(scope): short description` (e.g. `feat(orders): Odoo sync for orders`).
