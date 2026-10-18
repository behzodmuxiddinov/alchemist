# 🧪 Alchemist's Cauldron

A browser mini-game built with TypeScript and Vite, without frameworks or game engines.

The player mixes ingredients from the shelf in a cauldron and tries to move three
parameters — **Temperature**, **Density** and **Magic Power** — into the target ranges of a
random recipe, then brews the potion before the time or the lives run out.

Task description: [game-alchemists-cauldron](https://github.com/rolling-scopes-school/qualifying-stage/blob/main/tasks/game-alchemists-cauldron/README.md)

## Status

| Stage                  | Scope                                                        | Status      |
| ---------------------- | ------------------------------------------------------------ | ----------- |
| 🟣 Precondition 1      | Repository, tooling, folder structure, quality checks        | in progress |
| 🟢 Level 1 — Basic     | Shelf, cauldron, bars, recipes, brew, timer, lives, Top-10   | not started |
| 🟡 Level 2 — Extended  | Difficulty selection, auto-save and continue                 | not started |
| 🔴 Level 3 — Full game | Drag & drop, tooltip, reactions, Pour Out, keyboard, effects | not started |

## How to play

1. Press **Start Game** on the start screen.
2. Click an ingredient on the shelf to add it to the cauldron; each ingredient has a limited stock.
3. Watch the three bars and try to fit every value into the recipe target zone.
4. Press **Brew** to check the mix. A successful brew gives score and bonus time, a failed one costs a life.
5. The game ends when the time runs out, the lives run out, or the ingredients run out.

Gameplay is added story by story, so parts of this flow are not available yet.

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install     # install dependencies
npm run dev     # start the dev server at http://localhost:5173
npm run build   # type-check and build the production bundle to dist/
npm run preview # preview the production build
```

## Scripts

| Script                 | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Vite dev server with hot reload         |
| `npm run build`        | Type check and production build         |
| `npm run preview`      | Serve the production build locally      |
| `npm run lint`         | ESLint check, warnings are not allowed  |
| `npm run format`       | Format all files with Prettier          |
| `npm run format:check` | Check formatting without writing        |
| `npm run typecheck`    | TypeScript check without emitting files |

## Project structure

```text
src/
  assets/   static assets, icons
  data/     static game data: ingredients, recipes, difficulty, reactions
  logic/    pure game rules: cauldron math, recipe picking, stock, brew check, timer
  state/    game state and its transitions
  storage/  localStorage helpers: save, leaderboard
  styles/   SCSS tokens, mixins, reset and global styles
  types/    shared TypeScript types and interfaces
  ui/       DOM rendering: menu, shelf, cauldron, bars, dialogs
  main.ts   entry point
```

Game rules live in `logic/` and are kept out of the rendering files in `ui/`.

### Styles

Styles are written in SCSS and composed in `src/styles/main.scss`:

| File           | Content                                                               |
| -------------- | --------------------------------------------------------------------- |
| `tokens.scss`  | all design tokens as CSS custom properties on `:root`                 |
| `globals.scss` | reset, body, layout container and reduced motion rules                |
| `mixins.scss`  | breakpoint values and the `tablet` / `large` / `desktop` media mixins |
| `main.scss`    | entry point that composes the files above                             |

Tokens are used as `var(--space-md)` in every component style instead of a hard coded value.
Layout is mobile first: base rules target the smallest screen and a breakpoint mixin widens them.

```scss
@use '../styles/mixins' as *;

.shelf {
  gap: var(--space-xs);

  @include tablet {
    gap: var(--space-md);
  }
}
```

## Tooling

- **Vite** — dev server and production build, `@` alias points to `src/`.
- **Sass (SCSS)** — design tokens as CSS custom properties in `src/styles/tokens.scss`, no magic values in component styles.
- **TypeScript** — `strict` mode, `any` is forbidden.
- **ESLint** — flat config with the TypeScript and Unicorn rule sets.
- **Prettier** — automatic formatting, integrated with ESLint.
- **Husky + commitlint** — `commit-msg` validates conventional commits, `pre-commit` and
  `pre-push` run the lint, format and type checks and block the commit or push on failure.

## Workflow

Work is done in story branches: feature branches are created from `story-N`, merged back
into it with a Pull Request, and the finished story is offered as an unmerged Pull Request
into the previous branch.
