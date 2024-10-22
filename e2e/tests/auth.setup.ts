import { test as setup } from "@playwright/test";
import * as OTPAuth from "otpauth";
import { existsSync } from "fs";

const AuthFile = "auth.json";

setup("authenticate", async ({ page }) => {
  await page.goto(process.env.M365_PAGE_URL || "");
  await page.waitForURL(process.env.M365_PAGE_URL || "");
  await page.context().storageState({ path: AuthFile });
});
