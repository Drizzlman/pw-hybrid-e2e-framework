import type { Page } from '@playwright/test';
import type { TestPagesType, TestComponentsType } from './types';
import { RegistrationFlow } from './flows/registration.flow';
import { LoginFlow } from './flows/login.flow';
import { CartFlow } from './flows/cart.flow';
import { CheckoutFlow } from './flows/checkout.flow';

export class App {
  readonly home: TestPagesType['homePage'];
  readonly login: TestPagesType['loginPage'];
  readonly signup: TestPagesType['signupPage'];
  readonly products: TestPagesType['productsPage'];
  readonly productDetails: TestPagesType['productDetailsPage'];
  readonly cart: TestPagesType['cartPage'];
  readonly checkout: TestPagesType['checkoutPage'];
  readonly payment: TestPagesType['paymentPage'];
  readonly contact: TestPagesType['contactPage'];
  readonly account: TestPagesType['accountPage'];

  readonly navigation: TestComponentsType['navigation'];
  readonly footer: TestComponentsType['footer'];
  readonly categorySidebar: TestComponentsType['categorySidebar'];

  readonly registration: RegistrationFlow;
  readonly loginFlow: LoginFlow;
  readonly cartFlow: CartFlow;
  readonly checkoutFlow: CheckoutFlow;

  constructor(
    readonly page: Page,
    pages: TestPagesType,
    components: TestComponentsType
  ) {
    this.home = pages.homePage;
    this.login = pages.loginPage;
    this.signup = pages.signupPage;
    this.products = pages.productsPage;
    this.productDetails = pages.productDetailsPage;
    this.cart = pages.cartPage;
    this.checkout = pages.checkoutPage;
    this.payment = pages.paymentPage;
    this.contact = pages.contactPage;
    this.account = pages.accountPage;

    this.navigation = components.navigation;
    this.footer = components.footer;
    this.categorySidebar = components.categorySidebar;

    this.registration = new RegistrationFlow(pages.loginPage, pages.signupPage, pages.accountPage);
    this.loginFlow = new LoginFlow(pages.loginPage, components.navigation);
    this.cartFlow = new CartFlow(pages.productDetailsPage, pages.cartPage);
    this.checkoutFlow = new CheckoutFlow(pages.cartPage, pages.checkoutPage, pages.paymentPage);
  }

  async goto(url = '/') {
    await this.page.goto(url);
  }
}
