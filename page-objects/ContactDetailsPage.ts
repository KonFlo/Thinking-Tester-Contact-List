import { Page, Locator } from '@playwright/test';

export class ContactDetailsPage {
  readonly page: Page;
  readonly firstNameSpan: Locator;
  readonly lastNameSpan: Locator;
  readonly birthdateSpan: Locator;
  readonly emailSpan: Locator;
  readonly phoneSpan: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameSpan = page.locator('#firstName');
    this.lastNameSpan = page.locator('#lastName');
    this.birthdateSpan = page.locator('#birthdate');
    this.emailSpan = page.locator('#email');
    this.phoneSpan = page.locator('#phone');
    this.deleteButton = page.locator('#delete');
  }

  async deleteContact() {
    // Listen for the native confirm dialog and accept it
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    // Click the delete button
    await this.deleteButton.click();
  }
}