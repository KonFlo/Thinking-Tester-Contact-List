import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Contact List dashboard (`/contactList`).
 */
export class ContactListPage {
  readonly page: Page;
  readonly addContactButton: Locator;
  readonly contactRows: Locator;

  /**
   * Initializes page locators for navigation buttons and contact table rows.
   */
  constructor(page: Page) {
    this.page = page;
    this.addContactButton = page.locator('#add-contact');
    this.contactRows = page.locator('.contactTableBodyRow');
  }

  /**
   * Navigates to the contact creation form.
   */
  async clickAddContact() {
    await this.addContactButton.click();
  }

  /**
   * Selects and opens the details view for a contact by matching text.
   */
  async clickContactByName(name: string) {
    await this.page.getByText(name).click();
  }
}