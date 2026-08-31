import type { Locator } from '@playwright/test';

export class ProductCardComponent {
  readonly name: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly viewProductLink: Locator;

  constructor(private readonly root: Locator) {
    this.name = root.locator('.productinfo > p');
    this.price = root.locator('.productinfo > h2');
    this.addToCartButton = root.locator('.productinfo a.add-to-cart');
    this.viewProductLink = root.getByRole('link', { name: 'View Product' });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async openDetails() {
    await this.viewProductLink.click();
  }
}
