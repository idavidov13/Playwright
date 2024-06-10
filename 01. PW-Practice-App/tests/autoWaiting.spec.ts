import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  //await successButton.click();

  //const text = await successButton.textContent();
  await successButton.waitFor({ state: "attached" });
  const text = await successButton.allTextContents();

  expect(text).toEqual("Data loaded with AJAX get request.");
});

test("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  //wait for element

  //await page.waitForSelector(".bg-success");

  //wait for particular response

  await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});
