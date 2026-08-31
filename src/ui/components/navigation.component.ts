import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class NavigationComponent {
  private readonly navBar: Locator;
  private readonly homeLink: Locator;
  private readonly loginLink: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.navBar = page.locator('#header ul.navbar-nav');
    this.homeLink = this.navBar.getByRole('link', { name: 'Home' });
    this.loginLink = this.navBar.getByRole('link', { name: 'Signup / Login' });
    this.logoutLink = this.navBar.getByRole('link', { name: 'Logout' });
  }

  async goToHome() {
    await this.homeLink.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async expectLoggedInAs(name: string) {
    await expect(this.navBar).toContainText(`Logged in as ${name}`);
  }
}
