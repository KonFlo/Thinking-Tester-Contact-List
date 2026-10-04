import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Add User page (`/addUser`).
 */
export class AddUserPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  /**
   * Initializes page locators for registration inputs and form submission.
   */
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
  }

  /**
   * Fills in user registration details and submits the sign-up form.
   */
  async registerUser(firstName: string, lastName: string, email: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    // Wait for the backend registration API response and submit click concurrently
    await Promise.all([
      this.page.waitForResponse((response) => 
        response.url().includes('/users') && response.status() === 201
      ),
      this.submitButton.click()
    ]);
  }
}