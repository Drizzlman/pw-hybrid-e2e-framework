import { BasePage } from './base.page';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactPage extends BasePage {
  readonly successAlert = this.page.locator('#contact-page .alert-success');

  private readonly nameInput = this.page.locator('input[data-qa="name"]');
  private readonly emailInput = this.page.locator('input[data-qa="email"]');
  private readonly subjectInput = this.page.locator('input[data-qa="subject"]');
  private readonly messageInput = this.page.locator('textarea[data-qa="message"]');
  private readonly submitButton = this.page.locator('input[data-qa="submit-button"]');

  async goto() {
    await super.goto('/contact_us');
  }

  async checkPage() {
    await super.checkPage(/\/contact_us/);
    await this.expectVisible(this.nameInput);
  }

  async fillContactForm(message: ContactMessage) {
    await this.nameInput.fill(message.name);
    await this.emailInput.fill(message.email);
    await this.subjectInput.fill(message.subject);
    await this.messageInput.fill(message.message);
  }

  async submit() {
    await this.submitButton.click();
  }
}
