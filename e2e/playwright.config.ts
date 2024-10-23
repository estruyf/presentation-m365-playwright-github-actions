import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";
import { MsTeamsReporterOptions } from "playwright-msteams-reporter";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: [".env", ".env.token"] });
}

const config: PlaywrightTestConfig<{}, {}> = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 3 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    testIdAttribute: "data-testid",
    actionTimeout: 0,
    trace: "on-first-retry",
  },

  /**
   * `globalSetup` property cannot be used as it does not produce traces or artifacts.
   * https://playwright.dev/docs/test-global-setup-teardown#configure-globalsetup-and-globalteardown
   * globalSetup: require.resolve("./globals/global-setup.ts"),
   */

  globalSetup: require.resolve("./globals/global-setup.ts"),

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "setup",
    //   testMatch: "login.setup.ts",
    // },
    // {
    //   name: "refresh",
    //   testMatch: "auth.setup.ts",
    //   use: {
    //     storageState: "auth.json"
    //   },
    // },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // userAgent: `${devices["Desktop Chrome"].userAgent} Teams/1.4.00.32771 Electron/10.4.7`,
        viewport: { width: 2560, height: 1440 },
        headless: true,
        // storageState: "playwright/.auth/user.json",
        storageState: "auth.json"
      },
      // dependencies: ["setup"],
      // dependencies: ["refresh"],
      teardown: 'refresh auth',
    },
    {
      name: 'refresh auth',
      testMatch: "cleanup.auth.ts",
      use: {
        storageState: "playwright/.auth/m365.json",
      },
    },
  ],
};

if (config.reporter && config.reporter instanceof Array) {
  if (process.env.NODE_ENV !== "development") {
    config.reporter.push(["html"]);
    config.reporter.push([
      "@estruyf/github-actions-reporter",
      {
        showError: true,
        showArtifactsLink: true,
        azureStorageSAS: process.env.AZURE_STORAGE_SAS,
        azureStorageUrl: process.env.AZURE_STORAGE_URL,
      },
    ]);
    
    let runUrl = "";
    if (process.env.GITHUB_RUN_ID) {
      const runId = process.env.GITHUB_RUN_ID;
      const repo = process.env.GITHUB_REPOSITORY;
      runUrl = `${process.env.GITHUB_SERVER_URL}/${repo}/actions/runs/${runId}`;
    }

    config.reporter.push([
      "playwright-msteams-reporter",
      <MsTeamsReporterOptions>{
        webhookUrl: process.env.M365_WEBHOOK_URL,
        webhookType: "powerautomate",
        linkToResultsUrl: runUrl,
        mentionOnFailure: process.env.M365_USERNAME,
      },
    ]);


  } else {
    config.reporter.push(["html"]);
  }
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(config);
