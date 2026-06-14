# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

React-based PWA for I Ching divination using the 3-coin method. Interface is in Spanish. Deployed to GitHub Pages at https://pedrogongora.github.io/iching-react.

## Commands

```bash
npm start        # Dev server on localhost:3000
npm run build    # Production build
npm test         # Run Jest tests (Create React App / React Testing Library)
npm run deploy   # Build + push to gh-pages branch (GitHub Pages)
```

Single test file: `npm test -- --testPathPattern=<filename>`

## Architecture

Built with Create React App (no eject). The app is a single-page PWA with offline support via a custom service worker at `public/serviceWorker.js`.

**App flow** — three UI states managed in `src/components/AppContainer.js`:
1. `start` — landing screen
2. `coinshuffle` — animates 3-coin tosses, builds the hexagram line by line (6 tosses)
3. `result` — displays the final hexagram and its markdown description

**State** is shared via React Context defined in `src/components/StateContext.js`. Persisted to `localStorage`: theme (`light`|`dark`) and journal entries.

**Key files:**
- `src/hexagrams.js` — ~10k line I Ching engine: binary-to-hexagram mapping for all 64 hexagrams, mutation logic (changing lines: 6→7, 9→8), and trigram operations
- `src/assets/json/hexagrams.json` — metadata for all 64 hexagrams (wenNumber, char, name, binaryString)
- `src/assets/markdown/ryk/Hexagrama[1-64].md` — Spanish descriptions rendered via react-markdown
- `src/util/journal.js` — localStorage CRUD for session history (loadJournal, saveJournal, saveEntry, findEntry, updateEntry, deleteEntry)

**Notable dependencies:**
- `react-spring` — coin toss animations
- `react-markdown` — renders hexagram description markdown
- `seedrandom` — reproducible randomness for coin tosses

## Code Style

Prettier config (`.prettierrc`): 2-space indent, no semicolons, single quotes, no arrow-function parens for single params.

ESLint extends `react-app` and `react-app/jest` (CRA defaults).

## Service Worker

The service worker (`public/serviceWorker.js`) uses cache-first strategy scoped to `/iching-react/`. On install it fetches `asset-manifest.json` and caches all listed resources. Cache name is `iching-react-cache-v1` — bump this string to force cache invalidation on deploy.

## Deployment

```bash
npm run deploy
```

Runs `predeploy` (build) then pushes the `build/` directory to the `gh-pages` branch via the `gh-pages` package. The GitHub Pages site serves from that branch root.
