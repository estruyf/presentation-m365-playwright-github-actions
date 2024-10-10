# E2E Testing

## Getting started

- Install dependencies: `npm install`
- Create a `.env` file
- Add the following contents to the file:

```
SP_DEV_PAGE_URL=<page url>
SP_DEV_USERNAME=<username>
SP_DEV_PASSWORD=<password>
```

## Usage

`npx playwright test`
  Runs the end-to-end tests.
  
`npx playwright test --project=chromium`
  Runs the tests only on Desktop Chrome.

`npx playwright test example`
  Runs the tests in a specific file.

`npx playwright test --debug`
  Runs the tests in debug mode.

`npx playwright codegen`
    Auto generate tests with Codegen.

We suggest that you begin by typing: `npx playwright test`