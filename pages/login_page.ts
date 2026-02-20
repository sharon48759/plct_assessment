import { expect, Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  static url: string = "Account/Login";

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await this.page.locator("#Username").fill(username);
    await this.page.locator("#Password").fill(password);
    await this.page.locator("button[type='submit']").click();
  }
}
