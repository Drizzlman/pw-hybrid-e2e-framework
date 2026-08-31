import type { TestUser } from '../../data';
import type { LoginPage } from '../pages/login.page';
import type { SignupPage } from '../pages/signup.page';
import type { AccountPage } from '../pages/account.page';

export class RegistrationFlow {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly signupPage: SignupPage,
    private readonly accountPage: AccountPage
  ) {}

  async signUpViaUi(user: TestUser) {
    await this.loginPage.goto();
    await this.loginPage.startSignup(user.name, user.email);
    await this.signupPage.checkPage();
    await this.signupPage.fillAccountDetails(user);
    await this.signupPage.submit();
    await this.accountPage.checkCreated();
  }
}
