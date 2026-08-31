import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly deliveryAddress = this.page.locator('#address_delivery');
  readonly billingAddress = this.page.locator('#address_invoice');

  private readonly commentInput = this.page.locator('textarea[name="message"]');
  private readonly placeOrderButton = this.page.locator('a.check_out');

  async goto() {
    await super.goto('/checkout');
  }

  async checkPage() {
    await super.checkPage(/\/checkout/);
    await this.expectVisible(this.deliveryAddress);
  }

  async fillComment(comment: string) {
    await this.commentInput.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
