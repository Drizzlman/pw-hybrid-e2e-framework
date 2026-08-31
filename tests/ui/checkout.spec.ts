import { test, expect } from '../../src/fixtures';
import { buildPaymentDetails } from '../../src/data';

test.describe('Checkout', () => {
  test.beforeEach(async ({ app, registeredUser }) => {
    await app.loginFlow.loginAs(registeredUser);
  });

  test(
    'places an order end-to-end',
    { tag: ['@smoke', '@checkout'] },
    async ({ app, registeredUser }) => {
      await app.cartFlow.addProductToCart(1);

      await app.checkoutFlow.proceedToCheckout('Please deliver as soon as possible.');

      await expect(app.checkout.deliveryAddress).toContainText(
        `${registeredUser.firstName} ${registeredUser.lastName}`
      );
      await expect(app.checkout.deliveryAddress).toContainText(registeredUser.address1);
      await expect(app.checkout.deliveryAddress).toContainText(registeredUser.city);

      await app.checkoutFlow.placeOrderAndPay(buildPaymentDetails());

      await expect(app.payment.successHeading).toBeVisible();
    }
  );
});
