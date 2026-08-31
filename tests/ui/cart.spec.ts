import { test, expect } from '../../src/fixtures';

test.describe('Cart', () => {
  test.beforeEach(async ({ app, registeredUser }) => {
    await app.loginFlow.loginAs(registeredUser);
  });

  test('adds a product to the cart', { tag: ['@smoke', '@cart'] }, async ({ app }) => {
    await app.cartFlow.addProductToCart(1);

    await expect(app.cart.cartRows).toHaveCount(1);
    await expect(app.cart.cartRows.first()).toContainText('Blue Top');
    await expect(app.cart.cartRows.first()).toContainText('Rs. 500');
  });

  test('adds a product with a custom quantity', { tag: ['@cart'] }, async ({ app }) => {
    await app.cartFlow.addProductToCart(1, 3);

    await expect(app.cart.cartRows.first()).toContainText('Blue Top');
    await expect(app.cart.cartRows.first()).toContainText('Rs. 1500');
  });

  test('removes a product from the cart', { tag: ['@cart'] }, async ({ app }) => {
    await app.cartFlow.addProductToCart(1);

    await app.cart.removeProduct('Blue Top');

    await expect(app.cart.cartRows).toHaveCount(0);
  });
});
