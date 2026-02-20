import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page";
import { BenefitPage } from "../../pages/benefit_page";
import { defaultEmployee } from "../../data/users";

test.beforeEach(async ({ page }) => {
  await page.goto(LoginPage.url);
  const loginPage = new LoginPage(page);
  await loginPage.login("TestUser887", ">[V1%HYXi4cQ"); //retrieve from environment variable or secret in real tests
  await page.waitForLoadState("networkidle");
});

test("Add Employee", async ({ page }) => {
  const benefitPage = new BenefitPage(page);
  const employeeId = await benefitPage.addEmployee(
    defaultEmployee.firstName,
    defaultEmployee.lastName,
    defaultEmployee.dependants.toString(),
  );
  await expect(page.getByText(employeeId)).toBeVisible();
});

test("Edit Employee", async ({ page }) => {
  const firstName = "NotBob";
  const lastName = "NoBuilt";
  const dependents = "22";
  const benefitPage = new BenefitPage(page);
  const employeeId = await benefitPage.addEmployee(
    defaultEmployee.firstName,
    defaultEmployee.lastName,
    defaultEmployee.dependants.toString(),
  );
  await benefitPage.editEmployee(employeeId, firstName, lastName, dependents);
  const employeeRow = page
    .locator("table > tbody > tr")
    .filter({ hasText: employeeId });
  await expect(employeeRow).toContainText(firstName);
  await expect(employeeRow).toContainText(lastName);
  await expect(employeeRow).toContainText(dependents);
});

test("Delete Employee", async ({ page }) => {
  const benefitPage = new BenefitPage(page);
  const employeeId = await benefitPage.addEmployee(
    defaultEmployee.firstName,
    defaultEmployee.lastName,
    defaultEmployee.dependants.toString(),
  );
  await benefitPage.deleteEmployee(employeeId);
  const employeeRow = page
    .locator("table > tbody > tr")
    .filter({ hasText: employeeId });
  await expect(employeeRow).not.toBeVisible();
});

test("Logout", async ({ page }) => {
  const benefitPage = new BenefitPage(page);
  await benefitPage.logout();
  await expect(page).toHaveURL(LoginPage.url, { ignoreCase: true });
});

[
  {
    title: "Add employee without first name",
    firstName: "",
    lastName: "Employee",
    dependants: 3,
  },
  {
    title: "Add employee without last name",
    firstName: "Test",
    lastName: "",
    dependants: 3,
  },
  {
    title: "Add employee with negative dependants",
    firstName: "Test",
    lastName: "Employee",
    dependants: -1,
  },
  {
    title: "Add employee with 50 dependants",
    firstName: "Test",
    lastName: "Employee",
    dependants: 50,
  },
].forEach((testCase) => {
  test(testCase.title, async ({ page }) => {
    const benefitPage = new BenefitPage(page);
    await benefitPage.addEmployee(
      testCase.firstName,
      testCase.lastName,
      testCase.dependants.toString(),
    );
    await expect(page.getByText("Invalid employee data.")).toBeVisible(); //example of validation error message, currently a bug in the application
  });
});
