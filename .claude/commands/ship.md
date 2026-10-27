---
description: Check, commit and push your changes to GitHub (optionally as a pull request)
argument-hint: [optional: "pr" for a pull request, or a short description]
---

Put the current changes safely on GitHub. Extra info: $ARGUMENTS

Work through these steps in order, and report in Dutch in short sentences.

1. **Overview**
   - `git status` and `git diff --stat`. No changes? Say so and stop.
   - Not a Git repo yet? Suggest `git init` and ask for approval.

2. **Safety check** (stop on a problem)
   - Never commit `.env`, keys, tokens or passwords. Check the diff for anything that looks like a secret (e.g. `sk-`, `ghp_`, `API_KEY=` with a value). Found one? Stop, report it and propose adding it to `.gitignore`.
   - Make sure `node_modules/`, `vendor/`, `dist/` and `.env` are in `.gitignore`.
   - Is there a test command (`npm test`, `php artisan test`, `composer test`)? Run it. Tests fail? Report it and ask whether you should continue anyway.

3. **Commit**
   - Write a clear commit message in the style `type(scope): korte omschrijving` (feat, fix, docs, chore, refactor), based on the actual changes. Use the description from $ARGUMENTS if one is given.
   - Show the message + the list of files and **ask for confirmation**.
   - Then `git add` (only the relevant files) and `git commit`.

4. **Push**
   - Get the current branch. No `origin` remote? Ask for the GitHub URL, or suggest `gh repo create <naam> --private --source=. --push` if `gh` is available.
   - **Without "pr"**: `git push` (with `-u origin <branch>` the first time).
   - **With "pr"**: when you're on `main`, first create a branch `feature/<korte-naam>`, push it and create a pull request with `gh pr create` (title = commit message, body = summary of the changes). No `gh`? Then give the link GitHub shows after the push.

5. **Wrap up**
   - Commit hash, branch, and the link to the repo or pull request.

Rules: never `--force`, never `git reset --hard`, never push directly to someone else's branch, and never change git settings without asking.
