import type { TestUser } from '../../data';
import type { LoginPage } from '../pages/login.page';
import type { NavigationComponent } from '../components/navigation.component';

export class LoginFlow {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly navigation: NavigationComponent
  ) {}

  async loginAs(user: TestUser) {
    await this.loginPage.goto();
    await this.loginPage.login(user.email, user.password);
  }

  async expectLoggedIn(name: string) {
    await this.navigation.expectLoggedInAs(name);
  }

  async logout() {
    await this.navigation.logout();
  }
}
