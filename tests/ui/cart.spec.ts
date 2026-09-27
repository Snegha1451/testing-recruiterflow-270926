import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { users } from '../../fixtures/test-data';

test('adding two products updates the cart badge to 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addFirstNProductsToCart(2);

  await expect(productsPage.cartBadge).toHaveText('2');
});
