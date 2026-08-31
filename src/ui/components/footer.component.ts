import type { Locator, Page } from '@playwright/test';

export class FooterComponent {
  private readonly subscribeEmailInput: Locator;
  private readonly subscribeButton: Locator;

  constructor(private readonly page: Page) {
    this.subscribeEmailInput = page.getByPlaceholder('Your email address');
    this.subscribeButton = page.locator('#subscribe');
  }

  async subscribe(email: string) {
    await this.subscribeEmailInput.fill(email);
    await this.subscribeButton.click();
  }
}
