import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the initial Login / Welcome page (`/`).
 */
export class LoginPage {
  readonly page: Page;
  readonly signupButton: Locator;

  /**
   * Initializes page locators for login screen actions.
   */
  constructor(page: Page) {
    this.page = page;
    this.signupButton = page.locator('#signup');
  }

  /**
   * Navigates to the application root URL.
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Clicks the sign-up button to navigate to user registration.
   */
  async clickSignUp() {
    await this.signupButton.click();
  }
}