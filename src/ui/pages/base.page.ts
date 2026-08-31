import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async checkPage(url: RegExp) {
    await expect(this.page).toHaveURL(url);
  }

  protected expectVisible(locator: Locator) {
    return expect(locator).toBeVisible();
  }
}
