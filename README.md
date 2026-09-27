# playwright-demo-suite

Playwright + TypeScript test suite covering UI automation (saucedemo.com) and
API automation (reqres.in).

## Structure

```
playwright-demo-suite/
├── playwright.config.ts   # two projects: ui-chromium (saucedemo) and api (reqres.in)
├── pages/                 # Page Object Model classes for the UI
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   └── test-data.ts       # users + checkout info used across tests
└── tests/
    ├── ui/
    │   ├── login.spec.ts      # scenarios 1 & 2
    │   ├── cart.spec.ts       # scenario 3
    │   ├── checkout.spec.ts   # scenario 4
    │   └── sorting.spec.ts    # scenario 5
    └── api/
        └── users.spec.ts      # scenarios 6, 7, 8 (request fixture, no browser)
```

## Setup

```bash
npm install
npx playwright install chromium
```

reqres.in requires an API key when you run this (its classic endpoints
have auth — check https://reqres.in before
running and get the free api key), In the `.env`, set `REQRES_API_KEY`.

## Running

```bash
npm test              # everything (UI + API)
npm run test:ui       # saucedemo UI tests only
npm run test:api      # reqres.in API tests only
npx playwright show-report        # open the last HTML report
```

## Notes on design choices

- **Page Object Model** for the UI tests keeps selectors in one place per
  page, so a markup change only requires updating one file.
- **`addFirstNProductsToCart(n)`** always clicks the first remaining
  "Add to cart" button, so it works regardless of catalog/sort order rather
  than hardcoding specific product names.
- **API tests use the `request` fixture**, not `page` — no browser is
  launched for Part 2, per the prompt.
