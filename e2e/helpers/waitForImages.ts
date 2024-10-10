import { Page } from "@playwright/test";

export const waitForImages = async (page: Page): Promise<void> => {
  let locators = page
    .getByTestId(`sticker_inventory__overview__sticker`)
    .locator("img");
  // Set up listeners concurrently
  const promises = [];
  for (let i = 0; i < (await locators.count()); i++) {
    promises.push(
      locators
        .nth(i)
        .evaluate(
          (image: HTMLImageElement) =>
            image.complete || new Promise((f) => (image.onload = f))
        )
    );
  }
  // Wait for all once
  await Promise.all(promises);
};
