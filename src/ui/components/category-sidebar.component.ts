import type { Locator, Page } from '@playwright/test';

export class CategorySidebarComponent {
  readonly categoryHeading: Locator;
  readonly brandsHeading: Locator;

  private readonly categoryLinks: Locator;

  constructor(private readonly page: Page) {
    this.categoryHeading = page.getByRole('heading', { name: 'Category' });
    this.brandsHeading = page.getByRole('heading', { name: 'Brands' });
    this.categoryLinks = page.locator('.left-sidebar .panel a');
  }

  async selectCategory(name: string) {
    await this.categoryLinks.filter({ hasText: name }).first().click();
  }
}
