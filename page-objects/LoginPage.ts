import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupButton = page.locator('#signup');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickSignUp() {
    await this.signupButton.click();
  }
}