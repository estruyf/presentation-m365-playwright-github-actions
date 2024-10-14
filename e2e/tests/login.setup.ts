import { test as setup } from "@playwright/test";
import { existsSync } from "fs";

const authFile = "playwright/.auth/user.json";

// More info: https://playwright.dev/docs/auth

setup("authenticate", async ({ page }) => {
  // Check if the auth file exists
  if (existsSync(authFile)) {
    return;
  }

  await page.goto(process.env.M365_PAGE_URL || "");

  page.locator("input[type=email]").fill(process.env.M365_USERNAME || "");

  await page.getByRole("button", { name: "Next" }).click();

  page.locator("input[type=password]").fill(process.env.M365_PASSWORD || "");

  await Promise.all([
    await page.locator("input[type=submit][value='Sign in']").click(),
    await page.locator("input[type=submit][value='Yes']").click(),
    await page.waitForURL(process.env.M365_PAGE_URL || ""),
  ]);

  await page.context().storageState({ path: authFile });
});
