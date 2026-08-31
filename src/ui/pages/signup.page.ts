import type { TestUser } from '../../data';
import { BasePage } from './base.page';

export class SignupPage extends BasePage {
  readonly accountInformationHeading = this.page.getByRole('heading', {
    name: 'Enter Account Information',
  });

  private readonly passwordInput = this.page.locator('input[data-qa="password"]');
  private readonly daysSelect = this.page.locator('select[data-qa="days"]');
  private readonly monthsSelect = this.page.locator('select[data-qa="months"]');
  private readonly yearsSelect = this.page.locator('select[data-qa="years"]');
  private readonly firstNameInput = this.page.locator('input[data-qa="first_name"]');
  private readonly lastNameInput = this.page.locator('input[data-qa="last_name"]');
  private readonly companyInput = this.page.locator('input[data-qa="company"]');
  private readonly addressInput = this.page.locator('input[data-qa="address"]');
  private readonly address2Input = this.page.locator('input[data-qa="address2"]');
  private readonly countrySelect = this.page.locator('select[data-qa="country"]');
  private readonly stateInput = this.page.locator('input[data-qa="state"]');
  private readonly cityInput = this.page.locator('input[data-qa="city"]');
  private readonly zipcodeInput = this.page.locator('input[data-qa="zipcode"]');
  private readonly mobileNumberInput = this.page.locator('input[data-qa="mobile_number"]');
  private readonly createAccountButton = this.page.locator('button[data-qa="create-account"]');

  async goto() {
    await super.goto('/signup');
  }

  async checkPage() {
    await super.checkPage(/\/signup/);
    await this.expectVisible(this.accountInformationHeading);
  }

  async fillAccountDetails(user: TestUser) {
    await this.page.locator(`input[value="${user.title}"]`).check();
    await this.passwordInput.fill(user.password);
    await this.daysSelect.selectOption(user.birthDate);
    await this.monthsSelect.selectOption(user.birthMonth);
    await this.yearsSelect.selectOption(user.birthYear);
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.addressInput.fill(user.address1);
    await this.address2Input.fill(user.address2);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async submit() {
    await this.createAccountButton.click();
  }
}
