import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Contact Details page (`/contactDetails`).
 */
export class ContactDetailsPage {
  readonly page: Page;
  readonly firstNameSpan: Locator;
  readonly lastNameSpan: Locator;
  readonly birthdateSpan: Locator;
  readonly emailSpan: Locator;
  readonly phoneSpan: Locator;
  readonly deleteButton: Locator;

  /**
   * Initializes page locators for contact details display fields and action controls.
   */
  constructor(page: Page) {
    this.page = page;
    this.firstNameSpan = page.locator('#firstName');
    this.lastNameSpan = page.locator('#lastName');
    this.birthdateSpan = page.locator('#birthdate');
    this.emailSpan = page.locator('#email');
    this.phoneSpan = page.locator('#phone');
    this.deleteButton = page.locator('#delete');
  }

  /**
   * Handles native confirmation dialog and clicks the delete button to remove the contact.
   */
  async deleteContact() {
    // Set up dialog handler and click action concurrently
    await Promise.all([
      this.page.waitForEvent('dialog').then(async (dialog) => {
        await dialog.accept();
      }),
      this.deleteButton.click()
    ]);
  }
}