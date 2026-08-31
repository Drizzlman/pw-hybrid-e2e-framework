import { test, expect } from '../../src/fixtures';
import { buildUser } from '../../src/data';

test.describe('Registration', () => {
  test(
    'signs up a new user through the UI',
    { tag: ['@smoke', '@registration'] },
    async ({ app, apiClient }) => {
      const user = buildUser('registration');

      try {
        await app.registration.signUpViaUi(user);

        await expect(app.account.accountCreatedHeading).toBeVisible();
        await expect(app.page).toHaveURL(/\/account_created/);
      } finally {
        await apiClient.deleteAccount(user.email, user.password);
      }
    }
  );
});
