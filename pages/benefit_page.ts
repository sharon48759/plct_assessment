import { expect, Page } from "@playwright/test";

export class BenefitPage {
  page: Page;

  static url: string = "Benefits";

  constructor(page: Page) {
    this.page = page;
  }

  async addEmployee(firstName: string, lastName: string, dependents: string) {
    await this.page.getByRole("button", { name: "Add Employee" }).click();
    await this.fillEmployeeDetails(firstName, lastName, dependents);
    const apiRequest = this.page.waitForResponse((apiRequest) => {
      return apiRequest.url().includes("api/employees");
    });
    await this.page.locator("#addEmployee").click();
    const apiResponse = await apiRequest;
    return (await apiResponse.json()).id;
  }

  async editEmployee(
    id: string,
    firstName: string,
    lastName: string,
    dependents: string,
  ) {
    const employeeRow = this.page
      .locator("table > tbody > tr")
      .filter({ hasText: id });
    await employeeRow.locator("i.fa-edit").click();
    await this.fillEmployeeDetails(firstName, lastName, dependents);
    await this.page.locator("#updateEmployee").click();
  }

  async deleteEmployee(id: string) {
    const employeeRow = this.page
      .locator("table > tbody > tr")
      .filter({ hasText: id });
    await employeeRow.locator("i.fa-times").click();
    await this.page.locator("#deleteEmployee").click();
  }

  async logout() {
    await this.page.getByText("Log Out").click();
  }

  async fillEmployeeDetails(
    firstName: string,
    lastName: string,
    dependents: string,
  ) {
    await this.page.locator("#firstName").fill(firstName);
    await this.page.locator("#lastName").fill(lastName);
    await this.page.locator("#dependants").fill(dependents);
  }
}
