import type { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { ProductsPage } from '../pages/products.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';
import { ContactPage } from '../pages/contact.page';
import { AccountPage } from '../pages/account.page';
import type { TestPagesType } from '../types';

export const createPages = (page: Page): TestPagesType => ({
  homePage: new HomePage(page),
  loginPage: new LoginPage(page),
  signupPage: new SignupPage(page),
  productsPage: new ProductsPage(page),
  productDetailsPage: new ProductDetailsPage(page),
  cartPage: new CartPage(page),
  checkoutPage: new CheckoutPage(page),
  paymentPage: new PaymentPage(page),
  contactPage: new ContactPage(page),
  accountPage: new AccountPage(page),
});
