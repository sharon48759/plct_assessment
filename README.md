# Paylocity assesment

## Manual testing

UI and API bug reports can be found in [bugs](bugs).
> **_NOTE:_**  API testing was performed by capturing requests in the browser, as the link to the postman documentation was not accessible (404: 
We couldn't locate the resource you're looking for. It may have been deleted.)

## Automated tests

### Prerequisites

Install node v24

### How to run

Run all tests
- `npx playwright test`

Run tests with UI
- `npx playwright test --ui`

Run a single suite
- `npx playwright test benefits.spec.ts`

Run all API tests
- `npx playwright test api`

Run all UI tests
- `npx playwright test ui`
