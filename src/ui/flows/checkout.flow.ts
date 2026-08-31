import type { PaymentDetails } from '../../data';
import type { CartPage } from '../pages/cart.page';
import type { CheckoutPage } from '../pages/checkout.page';
import type { PaymentPage } from '../pages/payment.page';

export class CheckoutFlow {
  constructor(
    private readonly cartPage: CartPage,
    private readonly checkoutPage: CheckoutPage,
    private readonly paymentPage: PaymentPage
  ) {}

  async proceedToCheckout(comment?: string) {
    await this.cartPage.proceedToCheckout();
    await this.checkoutPage.checkPage();
    if (comment) {
      await this.checkoutPage.fillComment(comment);
    }
  }

  async placeOrderAndPay(details: PaymentDetails) {
    await this.checkoutPage.placeOrder();
    await this.paymentPage.checkPage();
    await this.paymentPage.pay(details);
    await this.paymentPage.checkPaid();
  }
}
