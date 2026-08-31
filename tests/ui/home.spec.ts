import { test, expect } from '../../src/fixtures';

test.describe('Home', () => {
  test(
    'loads the homepage with featured products',
    { tag: ['@smoke', '@home'] },
    async ({ app }) => {
      await app.home.goto();
      await app.home.checkPage();

      await expect(app.home.productCard(0).name).toBeVisible();
    }
  );

  test('browses a product category from the sidebar', { tag: ['@home'] }, async ({ app }) => {
    await app.home.goto();
    await app.categorySidebar.selectCategory('Women');
    await app.categorySidebar.selectCategory('Dress');

    await expect(app.products.sectionHeading).toHaveText('Women - Dress Products');
    await expect(app.products.productCard(0).name).toBeVisible();

    await app.navigation.goToHome();
    await app.home.checkPage();
  });

  test('subscribes to the newsletter from the footer', { tag: ['@home'] }, async ({ app }) => {
    await app.home.goto();

    await app.footer.subscribe(`sub-${Date.now()}@example.com`);

    await expect(app.page.locator('#success-subscribe')).toBeVisible();
  });
});
