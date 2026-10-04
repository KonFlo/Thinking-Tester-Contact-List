import { Page, Locator } from '@playwright/test';

/**
 * Data structure representing optional and required contact creation fields.
 */
export interface ContactData {
  firstName: string;
  lastName: string;
  dob?: string;
  email?: string;
  phone?: string;
  street1?: string;
  street2?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  country?: string;
}

/**
 * Page Object Model for the Add Contact page (`/addContact`).
 */
export class AddContactPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly street1Input: Locator;
  readonly street2Input: Locator;
  readonly cityInput: Locator;
  readonly stateProvinceInput: Locator;
  readonly postalCodeInput: Locator;
  readonly countryInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes page locators for form inputs, actions, and validation messages.
   */
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.dobInput = page.locator('#birthdate');
    this.emailInput = page.locator('#email');
    this.phoneInput = page.locator('#phone');
    this.street1Input = page.locator('#street1');
    this.street2Input = page.locator('#street2');
    this.cityInput = page.locator('#city');
    this.stateProvinceInput = page.locator('#stateProvince');
    this.postalCodeInput = page.locator('#postalCode');
    this.countryInput = page.locator('#country');
    this.submitButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
  }

  /**
   * Populates form fields selectively based on provided contact data.
   */
  async fillContactForm(data: ContactData) {
    if (data.firstName) await this.firstNameInput.fill(data.firstName);
    if (data.lastName) await this.lastNameInput.fill(data.lastName);
    if (data.dob) await this.dobInput.fill(data.dob);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.phone) await this.phoneInput.fill(data.phone);
    if (data.street1) await this.street1Input.fill(data.street1);
    if (data.street2) await this.street2Input.fill(data.street2);
    if (data.city) await this.cityInput.fill(data.city);
    if (data.stateProvince) await this.stateProvinceInput.fill(data.stateProvince);
    if (data.postalCode) await this.postalCodeInput.fill(data.postalCode);
    if (data.country) await this.countryInput.fill(data.country);
  }

  /**
   * Submits the contact creation form.
   */
  async submit() {
    await this.submitButton.click();
  }
}