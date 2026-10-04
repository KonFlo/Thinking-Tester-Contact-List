import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { AddUserPage } from '../page-objects/AddUserPage';
import { ContactListPage } from '../page-objects/ContactListPage';
import { AddContactPage } from '../page-objects/AddContactPage';
import { ContactDetailsPage } from '../page-objects/ContactDetailsPage';
import { generateRandomUser } from '../helpers/utils';

test.describe('Thinking Tester Contact List Application Suite', () => {
  let loginPage: LoginPage;
  let addUserPage: AddUserPage;
  let contactListPage: ContactListPage;
  let addContactPage: AddContactPage;
  let contactDetailsPage: ContactDetailsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addUserPage = new AddUserPage(page);
    contactListPage = new ContactListPage(page);
    addContactPage = new AddContactPage(page);
    contactDetailsPage = new ContactDetailsPage(page);

    // Navigate to homepage and sign up with a new user for each test block
    await loginPage.goto();
    await loginPage.clickSignUp();
    const newUser = generateRandomUser();
    await addUserPage.registerUser(newUser.firstName, newUser.lastName, newUser.email, newUser.password);
    
    // Assert redirected to contact list page
    await expect(page).toHaveURL(/.*\/contactList/);
  });

  test('Requirement 1: Sign up with a new user, add a new contact, and validate on details page', async () => {
    const contactData = {
      firstName: 'Alice',
      lastName: 'Smith',
      dob: '1990-05-15',
      email: 'alice.smith@example.com',
      phone: '1234567890',
      street1: '123 Main St',
      city: 'New York',
      stateProvince: 'NY',
      postalCode: '10001',
      country: 'USA'
    };

    await contactListPage.clickAddContact();
    await addContactPage.fillContactForm(contactData);
    await addContactPage.submit();

    // Verify returning to contact list page and contact appears in table
    await expect(contactListPage.contactRows).toHaveCount(1);
    await expect(contactListPage.contactRows.first()).toContainText(`${contactData.firstName} ${contactData.lastName}`);

    // Navigate to details page by clicking the created contact
    await contactListPage.clickContactByName(`${contactData.firstName} ${contactData.lastName}`);

    // Assert details match input data
    await expect(contactDetailsPage.firstNameSpan).toHaveText(contactData.firstName);
    await expect(contactDetailsPage.lastNameSpan).toHaveText(contactData.lastName);
    await expect(contactDetailsPage.birthdateSpan).toHaveText(contactData.dob);
    await expect(contactDetailsPage.emailSpan).toHaveText(contactData.email);
    await expect(contactDetailsPage.phoneSpan).toHaveText(contactData.phone);
  });

  test('Requirement 2: Try to add a contact with an invalid date of birth and validate error message', async () => {
    await contactListPage.clickAddContact();

    const invalidContactData = {
      firstName: 'Bob',
      lastName: 'Jones',
      dob: 'invalid-date-format'
    };

    await addContactPage.fillContactForm(invalidContactData);
    await addContactPage.submit();

    // Validate that an error is shown regarding invalid birthdate
    await expect(addContactPage.errorMessage).toBeVisible();
    await expect(addContactPage.errorMessage).toContainText('Contact validation failed: birthdate: Birthdate is invalid');
  });

  test('Requirement 3: Delete an existing contact', async () => {
    // 1. Add contact
    const contactData = {
      firstName: 'Charlie',
      lastName: 'Brown',
      dob: '1985-10-20'
    };

    await contactListPage.clickAddContact();
    await addContactPage.fillContactForm(contactData);
    await addContactPage.submit();

    // Assert contact added
    const fullName = `${contactData.firstName} ${contactData.lastName}`;
    await expect(contactListPage.contactRows).toHaveCount(1);

    // 2. Open contact details
    await contactListPage.clickContactByName(fullName);

    // 3. Delete contact (handles alert dialog internally)
    await contactDetailsPage.deleteContact();

    // 4. Validate redirected to contact list and table is empty
    await expect(contactListPage.page).toHaveURL(/.*\/contactList/);
    await expect(contactListPage.contactRows).toHaveCount(0);
  });
});