import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users, checkoutInfo } from '../../fixtures/test-data';

test('completes the full checkout flow and shows the thank-you message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await productsPage.addFirstNProductsToCart(2);
  await productsPage.goToCart();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(await cartPage.itemCount()).toBe(2);

  await cartPage.checkout();
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  await checkoutPage.fillInfo(
    checkoutInfo.firstName,
    checkoutInfo.lastName,
    checkoutInfo.postalCode
  );
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await checkoutPage.finish();
  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
