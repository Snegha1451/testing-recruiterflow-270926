import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../fixtures/test-data';

test('sorting by "Price (low to high)" shows the lowest-priced item first', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.sortBy('Price (low to high)');

  const prices = await productsPage.getDisplayedPrices();
  const expectedOrder = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(expectedOrder);
  expect(prices[0]).toBe(Math.min(...prices));
});
