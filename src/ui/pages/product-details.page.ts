import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  readonly name = this.page.locator('.product-information').getByRole('heading');
  readonly category = this.page.locator('.product-information p').filter({ hasText: /Category:/ });
  readonly price = this.page.locator('.product-information span span');
  readonly availability = this.page
    .locator('.product-information p')
    .filter({ hasText: /Availability:/ });

  readonly cartModal = this.page.locator('#cartModal');
  readonly cartModalTitle = this.cartModal.locator('.modal-title');

  private readonly quantityInput = this.page.locator('#quantity');
  private readonly addToCartButton = this.page.locator('button.btn.btn-default.cart');
  private readonly viewCartLink = this.cartModal.locator('a[href="/view_cart"]');

  async goto(productId: string | number) {
    await super.goto(`/product_details/${productId}`);
  }

  async checkPage() {
    await super.checkPage(/\/product_details\/\d+/);
    await this.expectVisible(this.name);
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.cartModalTitle).toHaveText('Added!');
  }

  async goToCart() {
    await this.viewCartLink.click();
  }
}
