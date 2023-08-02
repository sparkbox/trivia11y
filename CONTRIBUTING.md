# Contributing

## Steps to submit a PR

- Clone/Fork the repo
- Install dependencies: `npm install`
- Ensure linters pass: `npm run lint`
- Ensure tests pass: `npm test`
- Make changes and then make sure the linters and tests still pass
- Push your branch/fork and [submit a PR][pr]
- Assign a [sparkboxer][contributors] to review your PR

## Commit Style

We use [Conventional Commits] on this project. Commit messages must be prefixed with a valid commit type and the commit type cannot be prefixed with any additional text.

Supported commit types include `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, and `test`.

Valid example:

```sh
feat: add new linting rule for ...
```

Invalid examples:

```sh
feature: add new linting rule for ...
```

```sh
:sparkles: feat: add new linting rule for ...
```

ℹ️ See the [Conventional Commits] page for further details on available commit types and how to handle breaking changes.

## Creating a Release

If your PR is approved, the person who reviewed it will merge it into the `main` branch, triggering the deployment to production.

[pr]: https://github.com/sparkbox/trivia11y/compare
[contributors]: https://github.com/sparkbox/trivia11y/graphs/contributors
[Conventional Commits]: https://www.conventionalcommits.org/en/v1.0.0/
