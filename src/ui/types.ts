import type { HomePage } from './pages/home.page';
import type { LoginPage } from './pages/login.page';
import type { SignupPage } from './pages/signup.page';
import type { ProductsPage } from './pages/products.page';
import type { ProductDetailsPage } from './pages/product-details.page';
import type { CartPage } from './pages/cart.page';
import type { CheckoutPage } from './pages/checkout.page';
import type { PaymentPage } from './pages/payment.page';
import type { ContactPage } from './pages/contact.page';
import type { AccountPage } from './pages/account.page';
import type { NavigationComponent } from './components/navigation.component';
import type { FooterComponent } from './components/footer.component';
import type { CategorySidebarComponent } from './components/category-sidebar.component';

export interface TestPagesType {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  productsPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  contactPage: ContactPage;
  accountPage: AccountPage;
}

export interface TestComponentsType {
  navigation: NavigationComponent;
  footer: FooterComponent;
  categorySidebar: CategorySidebarComponent;
}
