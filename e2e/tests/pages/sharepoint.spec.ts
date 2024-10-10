import { test, expect, Page } from "@playwright/test";
import { waitForImages } from "helpers";

// test.describe.configure({ mode: "serial" });

test.describe(`Validate sticker inventory`, () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(process.env.M365_PAGE_URL || "", {
      waitUntil: "domcontentloaded",
    });

    await page
      .locator(
        `div[data-sp-web-part-id="0e05b9af-5e56-4570-8b3e-9d679f8b2fcf"]`
      )
      .waitFor();
  });

  test(`Check if webpart is rendered`, async () => {
    const webpart = page.locator(
      `div[data-sp-web-part-id="0e05b9af-5e56-4570-8b3e-9d679f8b2fcf"]`
    );
    await expect(webpart).toBeVisible();

    await waitForImages(page);
  });

  test(`Check if the webpart rendered as expected`, async () => {
    const webpart = page.locator(
      `div[data-sp-web-part-id="0e05b9af-5e56-4570-8b3e-9d679f8b2fcf"]`
    );

    await expect(webpart).toHaveScreenshot({
      mask: [page.getByTestId(`sticker_inventory__refresh`)],
    });
  });

  test(`Check if there are 9 stickers`, async () => {
    await page.goto(process.env.M365_PAGE_URL || "", {
      waitUntil: "domcontentloaded",
    });

    const response = await page.waitForResponse(
      (resp) =>
        resp
          .url()
          .toLowerCase()
          .includes("/_api/web/lists/getbytitle('inventory')/items") &&
        resp.request().method() === "GET"
    );

    const totalItems = (await response.json()).value.length;
    const stickers = page.getByTestId(`sticker_inventory__overview__sticker`);
    await expect(stickers).toHaveCount(totalItems);
  });

  test(`Check hover effect on stickers`, async () => {
    const sticker = page
      .getByTestId(`sticker_inventory__overview__sticker`)
      .first();

    await expect(
      sticker.getByTestId(`sticker_inventory__sticker__description`)
    ).toBeHidden();

    await sticker.hover();

    await expect(
      sticker.getByTestId(`sticker_inventory__sticker__description`)
    ).toBeVisible();
  });

  test(`Check if filtering works`, async () => {
    await page.route("**/_api/web/lists/**", async (route) => {
      await page.waitForTimeout(3000);

      route.continue();
    });

    const input = page.getByTestId(`sticker_inventory__filter__input`);
    await input.fill(`25`);

    const btn = page.getByTestId(`sticker_inventory__filter__button`);
    await btn.click();

    const response = await page.waitForResponse(
      (resp) =>
        resp
          .url()
          .toLowerCase()
          .includes("/_api/web/lists/getbytitle('inventory')/items") &&
        resp.request().method() === "GET"
    );

    const totalItems = (await response.json()).value.length;

    await waitForImages(page);

    const stickers = page.getByTestId(`sticker_inventory__overview__sticker`);
    await expect(stickers).toHaveCount(totalItems);
  });

  test(`Test the unexpected`, async () => {
    await page.route("**/_api/web/lists/**", async (route) => {
      await route.fulfill({
        status: 500,
      });
    });

    const input = page.getByTestId(`sticker_inventory__filter__input`);
    await input.fill(`25`);

    const btn = page.getByTestId(`sticker_inventory__filter__button`);
    await btn.click();

    const errorElm = page.getByTestId(`sticker_inventory__error`);
    await expect(errorElm).toBeVisible();
    await expect(errorElm).toContainText(/Error fetching stickers/);

    await expect(errorElm).toHaveScreenshot(`error.png`);
  });

  test(`Check with mocked data`, async () => {
    await page.route(
      (url) =>
        url.href
          .toLowerCase()
          .includes("/_api/web/lists/getbytitle('inventory')/items"),
      (route) => {
        return route.fulfill({
          status: 200,
          body: JSON.stringify({
            value: [
              {
                Id: 1,
                Title: "Sticker 1",
                Description: "Just a description of a sticker",
                Image: "happy-coding/2023-happy-coding.png",
                Price: 3,
                Total: 10,
              },
              {
                Id: 1,
                Title: "Sticker 2",
                Description: "Just a description of a sticker",
                Image: "418-teapot.png",
                Price: 2,
                Total: 1,
              },
            ],
          }),
        });
      }
    );

    await page.goto(process.env.M365_PAGE_URL || "", {
      waitUntil: "domcontentloaded",
    });

    const stickers = page.getByTestId(`sticker_inventory__overview__sticker`);
    await expect(stickers).toHaveCount(2);

    await waitForImages(page);

    const inventory = page.getByTestId(`sticker_inventory__overview`);
    await expect(inventory).toHaveScreenshot(`mocked-data.png`);
  });

  test.afterAll(async () => {
    await page.close();
  });
});
