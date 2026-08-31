import type { ProductDetailsPage } from '../pages/product-details.page';
import type { CartPage } from '../pages/cart.page';

export class CartFlow {
  constructor(
    private readonly productDetailsPage: ProductDetailsPage,
    private readonly cartPage: CartPage
  ) {}

  async addProductToCart(productId: number, quantity = 1) {
    await this.productDetailsPage.goto(productId);
    if (quantity > 1) {
      await this.productDetailsPage.setQuantity(quantity);
    }
    await this.productDetailsPage.addToCart();
    await this.productDetailsPage.goToCart();
    await this.cartPage.checkPage();
  }
}
