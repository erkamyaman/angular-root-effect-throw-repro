# angular-root-effect-throw-repro

Reproduction for a bug in Angular 22.2.1: when a root effect throws, the root effects registered after it stop running for good, and the view is not refreshed in that tick.

## Run it

```bash
npm install
npx ng serve
```

Open http://localhost:4200.

## Steps

1. The page shows `sibling effect runs: 1`.
2. Click **Break first effect + bump other**.
3. Click **Bump other** a few times.

## What happens

- After step 2 nothing changes on screen (`trigger` still says `false`) and `sibling effect runs` stays at 1.
- After step 3 `other` keeps counting, but `sibling effect runs` never moves from 1.
- `Error: boom` is reported once to the console, which is expected.

Without the throwing effect the counter goes 1, 2, 3.

## Where the code is

- `src/app/probe.ts`: a root service with two effects. The first throws once `trigger` is set, the second counts runs.
- `src/app/app.ts`: the buttons.
