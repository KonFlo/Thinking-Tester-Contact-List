import { Page, Locator } from '@playwright/test';

export class ContactListPage {
  readonly page: Page;
  readonly addContactButton: Locator;
  readonly contactRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addContactButton = page.locator('#add-contact');
    this.contactRows = page.locator('.contactTableBodyRow');
  }

  async clickAddContact() {
    await this.addContactButton.click();
  }

  async clickContactByName(name: string) {
    await this.page.getByText(name).click();
  }
}