import { test, expect } from '../../src/fixtures';

test.describe('Login', () => {
  test(
    'logs in with valid credentials',
    { tag: ['@smoke', '@login'] },
    async ({ app, registeredUser }) => {
      await app.loginFlow.loginAs(registeredUser);
      await app.loginFlow.expectLoggedIn(registeredUser.name);
    }
  );

  test(
    'logs out after a successful login',
    { tag: ['@login'] },
    async ({ app, registeredUser }) => {
      await app.loginFlow.loginAs(registeredUser);
      await app.loginFlow.expectLoggedIn(registeredUser.name);

      await app.loginFlow.logout();

      await app.login.checkPage();
    }
  );

  test('shows an error for invalid credentials', { tag: ['@login'] }, async ({ app }) => {
    await app.login.goto();
    await app.login.login('invalid@example.com', 'wrong-password');

    await expect(app.login.loginError).toHaveText('Your email or password is incorrect!');
  });
});
