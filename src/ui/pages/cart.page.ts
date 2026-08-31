import type { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private readonly cartTable = this.page.locator('#cart_info_table');
  readonly cartRows = this.cartTable.locator('tbody tr');
  readonly emptyCartMessage = this.page.locator('#empty_cart');

  private readonly checkoutButton = this.page.locator('a.check_out');

  async goto() {
    await super.goto('/view_cart');
  }

  async checkPage() {
    await super.checkPage(/\/view_cart/);
    await this.expectVisible(this.cartTable);
  }

  private row(name: string): Locator {
    return this.cartRows.filter({ hasText: name });
  }

  async removeProduct(name: string) {
    await this.row(name).locator('a.cart_quantity_delete').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
