import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login_page";
import { BenefitPage } from "../../pages/benefit_page";

test.beforeEach(async ({ page }) => {
  await page.goto(LoginPage.url);
});

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("TestUser887", ">[V1%HYXi4cQ"); //retrieve from environment variable or secret in real tests
  await expect(page).toHaveURL(BenefitPage.url);
});

const unsuccessfulLoginCases = [
  { title: "Login with wrong username", username: "uname", password: "pass" }, //currently a bug that leads to a 405 error
  {
    title: "Login with wrong password",
    username: "TestUser887",
    password: "pass",
  },
];

unsuccessfulLoginCases.forEach((testCase) => {
  test(testCase.title, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testCase.username, testCase.password);
    await expect(
      page.getByText("The specified username or password is incorrect."),
    ).toBeVisible();
  });
});
