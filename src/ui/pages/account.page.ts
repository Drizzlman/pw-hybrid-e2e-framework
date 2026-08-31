import { BasePage } from './base.page';

export class AccountPage extends BasePage {
  readonly accountCreatedHeading = this.page.getByRole('heading', { name: 'Account Created!' });

  private readonly continueButton = this.page.locator('a[data-qa="continue-button"]');

  async checkCreated() {
    await super.checkPage(/\/account_created/);
    await this.expectVisible(this.accountCreatedHeading);
  }

  async continue() {
    await this.continueButton.click();
  }
}
