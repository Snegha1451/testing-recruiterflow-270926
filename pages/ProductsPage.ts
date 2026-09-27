import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  // readonly bagaddtocart: Locator;
  // readonly lightaddtocart: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.bagaddtocart = page.locator("[data-test='add-to-cart-sauce-labs-backpack']");
    // this.lightaddtocart = page.locator("[data-test='add-to-cart-sauce-labs-bike-light']");
    this.inventoryItems = page.locator("[data-test='inventory-container']");
    this.cartBadge = page.locator("[data-test='shopping-cart-badge']");
    this.cartLink = page.locator("[data-test='shopping-cart-link']");
    this.sortDropdown = page.getByLabel("Sort products");
    this.itemPrices = page.locator("[data-test='inventory-item-price']");
  }

  async isLoaded(): Promise<boolean> {
    return this.inventoryItems.isVisible();
  }

  /**
   * Adds the first `n` products currently shown on the page to the cart,
   * in whatever order they're displayed. Works regardless of sort order
   * since it always targets the first remaining "Add to cart" button.
   */
  async addFirstNProductsToCart(n: number) {
    const addButtons = this.page.getByRole('button', { name: 'Add to cart' });
    for (let i = 0; i < n; i++) {
      await addButtons.first().click();
    }
  }

  async sortBy(optionLabel: string) {
    await this.sortDropdown.selectOption({ label: optionLabel });
  }

  async getDisplayedPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
