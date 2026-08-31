import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly loginForm = this.page.locator('form[action="/login"]');
  private readonly signupForm = this.page.locator('form[action="/signup"]');

  private readonly emailInput = this.loginForm.locator('input[data-qa="login-email"]');
  private readonly passwordInput = this.loginForm.locator('input[data-qa="login-password"]');
  private readonly loginButton = this.loginForm.locator('button[data-qa="login-button"]');
  readonly loginError = this.page.locator('.login-form p');

  private readonly signupNameInput = this.signupForm.locator('input[data-qa="signup-name"]');
  private readonly signupEmailInput = this.signupForm.locator('input[data-qa="signup-email"]');
  private readonly signupButton = this.signupForm.locator('button[data-qa="signup-button"]');

  async goto() {
    await super.goto('/login');
  }

  async checkPage() {
    await super.checkPage(/\/login/);
    await this.expectVisible(this.loginForm);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async startSignup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
