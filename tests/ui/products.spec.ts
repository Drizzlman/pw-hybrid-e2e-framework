import { test, expect } from '../../src/fixtures';

test.describe('Products', () => {
  test('searches for a product by name', { tag: ['@smoke', '@products'] }, async ({ app }) => {
    await app.products.goto();

    await app.products.search('Blue Top');

    await expect(app.products.sectionHeading).toHaveText('Searched Products');
    await expect(app.products.productCard(0).name).toHaveText('Blue Top');
    await expect(app.products.productCard(0).price).toHaveText('Rs. 500');
  });

  test('opens product details from the catalog', { tag: ['@products'] }, async ({ app }) => {
    await app.products.goto();

    await app.products.productCard(0).openDetails();

    await app.productDetails.checkPage();
    await expect(app.productDetails.name).toHaveText('Blue Top');
    await expect(app.productDetails.category).toHaveText('Category: Women > Tops');
    await expect(app.productDetails.price).toHaveText('Rs. 500');
  });
});
