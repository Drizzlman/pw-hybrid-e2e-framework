import { expect } from '@playwright/test';
import type { PaymentDetails } from '../../data';
import { BasePage } from './base.page';

export class PaymentPage extends BasePage {
  readonly successHeading = this.page.getByRole('heading', { name: 'Order Placed!' });

  private readonly nameOnCardInput = this.page.locator('input[data-qa="name-on-card"]');
  private readonly cardNumberInput = this.page.locator('input[data-qa="card-number"]');
  private readonly cvcInput = this.page.locator('input[data-qa="cvc"]');
  private readonly expiryMonthInput = this.page.locator('input[data-qa="expiry-month"]');
  private readonly expiryYearInput = this.page.locator('input[data-qa="expiry-year"]');
  private readonly payButton = this.page.locator('button[data-qa="pay-button"]');

  async goto() {
    await super.goto('/payment');
  }

  async checkPage() {
    await super.checkPage(/\/payment/);
    await this.expectVisible(this.nameOnCardInput);
  }

  async pay(details: PaymentDetails) {
    await this.nameOnCardInput.fill(details.nameOnCard);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.cvcInput.fill(details.cvc);
    await this.expiryMonthInput.fill(details.expiryMonth);
    await this.expiryYearInput.fill(details.expiryYear);
    await this.payButton.click();
  }

  async checkPaid() {
    await expect(this.successHeading).toBeVisible();
  }
}
