# GitHub Actions crash course for Star Wars Hub

This guide walks you through GitHub Actions from first principles and uses the repository's new Continuous Integration (CI) workflow (`.github/workflows/ci.yml`) as a concrete example. Follow it sequentially the first time, then keep it handy as a checklist/reference.

---

## 1. Why GitHub Actions?

GitHub Actions lets you automate tasks whenever something happens in your repository: pushing code, opening a pull request (PR), cutting a release, or even clicking a "Run workflow" button. Common automations include:

- **Continuous Integration** – run lint/tests/builds on every commit.
- **Continuous Delivery** – package and deploy to staging/production.
- **Utility tasks** – label issues, sync branches, rotate dependencies, etc.

Everything lives alongside your code in YAML files, making automation versioned, reviewable, and reproducible.

---

## 2. Core building blocks

| Concept | TL;DR | In our workflow |
| --- | --- | --- |
| **Workflow** | YAML file under `.github/workflows/` describing automation. | `ci.yml` |
| **Event** (`on:`) | Trigger that starts a workflow (push, PR, cron, manual). | Push or PR to `main`, plus manual `workflow_dispatch`. |
| **Job** | Collection of steps that run on the same runner. Jobs can run in parallel. | Single job `lint-and-build`. |
| **Runner** | Machine that executes steps (GitHub-hosted `ubuntu-latest` or self-hosted). | GitHub-hosted Ubuntu runner. |
| **Step** | Individual action or shell command executed in order. | Checkout, set up Node, install deps, lint, build. |
| **Action** | Reusable step packaged by GitHub or the community. | `actions/checkout`, `actions/setup-node`, `pnpm/action-setup`. |
| **Secret/Env** | Secure or shared values available to steps. | `CI=true` environment flag (secrets available when needed). |
| **Artifact** | Files uploaded for later jobs or download (build outputs, logs). | Not used yet, but easy to add. |

---

## 3. Workflow anatomy

```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
  workflow_dispatch:

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
```

- `name` is what you see in the Actions tab.
- `on` defines triggers. Here we validate every push/PR targeting `main` and allow a manual rerun (`workflow_dispatch`).
- `concurrency` ensures there is only one run per branch; if you push quickly, older runs auto-cancel to save minutes.

```yaml
jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
```

- `jobs` is a map; each job needs a unique key. Jobs run in parallel unless `needs:` is used.
- `runs-on` selects the runner image.
- `permissions` follows least privilege (here we only need read access to the repo).

```yaml
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js from .nvmrc
        uses: actions/setup-node@v4
        with:
          node-version-file: ".nvmrc"
          cache: "pnpm"
```

- Each step either `uses` a pre-built action or `run`s a shell command.
- `actions/checkout` pulls your code.
- `actions/setup-node` aligns the runner's Node version with `.nvmrc` and configures built-in dependency caching for pnpm.

```yaml
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9
          run_install: false

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Build project
        run: pnpm build

    env:
      CI: true
```

- `pnpm/action-setup` installs a pnpm CLI that matches your local version.
- `pnpm install --frozen-lockfile` guarantees lockfile fidelity, so CI fails if the lockfile is stale.
- Linting and building reuse the same dependency cache, keeping CI fast.
- `env` sets `CI=true`, which makes many tools output non-interactive logs and fail faster when something is wrong.

---

## 4. Hands-on guidance

1. **Create a feature branch** and push code – the workflow runs automatically.
2. **Open a Pull Request** – GitHub shows the workflow status; reviewers can block merges if CI fails.
3. **Watch the logs** via *Actions → CI → latest run*. Steps stream logs live; collapsed groups help you debug quickly.
4. **Re-run with different inputs** using the *Run workflow* button (thanks to `workflow_dispatch`). Handy for verifying main without new commits.
5. **Fail fast** – if lint fails, the job stops and GitHub surfaces the failing step, keeping feedback tight.

---

## 5. Customize when you're ready

| Scenario | What to tweak |
| --- | --- |
| Support multiple Node versions | Add a `strategy.matrix.node` and pass `node-version: ${{ matrix.node }}` to `setup-node`. |
| Add automated tests | Insert `pnpm test` (or another script) after install. |
| Upload production build | Run `pnpm build` then `actions/upload-artifact` to share `dist/`. |
| Deploy to hosting | Add a second job that `needs: lint-and-build` and uses provider-specific actions (e.g., Vercel CLI, Netlify Deploy). |
| Protect secrets | Store tokens via *Settings → Secrets and variables → Actions* and reference them as `${{ secrets.MY_TOKEN }}` in steps. |
| Schedule checks | Add `schedule:
      - cron: "0 6 * * 1"` under `on:` for weekly runs. |

---

## 6. Troubleshooting checklist

1. **Runner mismatch** – confirm `actions/setup-node` points to `.nvmrc` (already handled).
2. **Cache misses** – caches key off `pnpm-lock.yaml`. Commit lockfile changes to benefit.
3. **Permission errors** – ensure job permissions include what the action needs (e.g., `contents: write` for releases).
4. **Long installs** – consider `pnpm store prune` locally before committing large lockfile changes or enable `pnpm fetch` caching.
5. **Debugging** – add `ACTIONS_STEP_DEBUG` secret set to `true` temporarily for verbose logs.

---

## 7. Next learning steps

- Browse the [GitHub Actions docs](https://docs.github.com/actions) focusing on *Events*, *Contexts*, and *Expressions*.
- Explore marketplace actions for deploy targets you use (Vercel, Netlify, Cloudflare, Firebase...).
- Experiment with **matrix builds** (different browsers, OSs, Node versions) as your test surface grows.
- Combine **required status checks** with branch protection rules so CI must pass before merging.

With these fundamentals plus the working `ci.yml`, you can now read, modify, and create workflows confidently. When new automation ideas surface, treat them like application code—open a PR, iterate with reviews, and let GitHub Actions do the repetitive work for you.
