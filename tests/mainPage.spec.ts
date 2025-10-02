import { test, expect } from "@playwright/test";

test("Проверка отображения элементов хэдера", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
  await expect(page.getByRole("link", { name: "API" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Node.js" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Community" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "GitHub repository" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Discord server" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Switch between dark and light" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Search (Ctrl+K)" })
  ).toBeVisible();
});

test("Проверка названий элементов в хэдере", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(
    page.getByRole("link", { name: "Playwright logo Playwright" })
  ).toContainText("Playwright");
  await expect(page.getByRole("link", { name: "Docs" })).toContainText("Docs");
  await expect(page.getByRole("link", { name: "API" })).toContainText("API");
  await expect(page.getByRole("button", { name: "Node.js" })).toContainText(
    "Node.js"
  );
  await expect(page.getByRole("link", { name: "Community" })).toContainText(
    "Community"
  );
});

test("Проверка переключения темы light/dark", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-choice",
    "system"
  );
  await page
    .getByRole("button", { name: "Switch between dark and light" })
    .click();
  await page
    .getByRole("button", { name: "Switch between dark and light" })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme-choice",
    "dark"
  );
});

test("Проверка заголовка страницы", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Playwright enables reliable" })
  ).toContainText(
    "Playwright enables reliable end-to-end testing for modern web apps."
  );
});

test("Проверка кнопки Get Started", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect.soft(page.getByRole("link", { name: "Get started" })).toBeVisible();
  await expect.soft(page.getByRole("link", { name: "Get started" })).toContainText(
    "Get started"
  );
  await expect.soft(page.getByRole("link", { name: "Get started" })).toHaveAttribute(
    "href",
    "/docs/intro"
  );
});
