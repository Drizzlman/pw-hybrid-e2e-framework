import { test, expect } from '../../src/fixtures';
import { buildUser } from '../../src/data';

test.describe('Contact', () => {
  test('submits the contact form', { tag: ['@smoke', '@contact'] }, async ({ app, page }) => {
    const user = buildUser('contact');

    await app.contact.goto();
    await app.contact.fillContactForm({
      name: user.name,
      email: user.email,
      subject: 'Test subject',
      message: 'This is a test message.',
    });

    page.on('dialog', (dialog) => dialog.accept());
    await app.contact.submit();

    await expect(app.contact.successAlert).toBeVisible();
    await expect(app.contact.successAlert).toContainText(
      'Success! Your details have been submitted successfully.'
    );
  });
});
