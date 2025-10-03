import { test, expect } from "@playwright/test";
import { Element } from "../types/elements.interface";

const elements: Element[] = [
  {
    locator: (page) =>
      page.getByRole("link", { name: "Playwright logo Playwright" }),
    name: "Playwright logo",
    text: "Playwright",
    attribute: {
      type: "href",
      value: "/",
    }
  },
  {
    locator: (page) => page.getByRole("link", { name: "Docs" }),
    name: "Docs",
    text: "Docs",
    attribute: {
      type: "href",
      value: "/docs/intro",
    },
  },
  {
    locator: (page) => page.getByRole("link", { name: "API" }),
    name: "API",
    text: "API",
    attribute: {
      type: "href",
      value: "/docs/api/class-playwright",
    },
  },
  {
    locator: (page) => page.getByRole("button", { name: "Node.JS" }),
    name: "Node.JS",
    text: "Node.js",
  },
  {
    locator: (page) => page.getByRole("link", { name: "Community" }),
    name: "Community",
    text: "Community",
    attribute: {
      type: "href",
      value: "/community/welcome",
    },
  },
  {
    locator: (page) => page.getByLabel("GitHub repository"),
    name: "GitHub",
    attribute: {
      type: "href",
      value: "https://github.com/microsoft/playwright",
    },
  },
  {
    locator: (page) => page.getByLabel("Discord server"),
    name: "Discord",
    attribute: {
      type: "href",
      value: "https://aka.ms/playwright/discord",
    },
  },
  {
    locator: (page) => page.getByLabel("Switch between dark and light"),
    name: "Switcher light/dark",
  },
  {
    locator: (page) => page.getByLabel("Search (Ctrl+K)"),
    name: "Search",
  },
  {
    locator: (page) => page.getByRole("heading", { name: "Playwright enables reliable" }),
    name: "Title",
    text: "Playwright enables reliable end-to-end testing for modern web apps.",
  },
  {
    locator: (page) => page.getByRole("link", { name: "Get started" }),
    name: "Get started button",
    text: "Get started",
    attribute: {
      type: "href",
      value: "/docs/intro",
    }
  }
];

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });
  test("Проверка отображения элементов хэдера", async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`${name}`, async () => {
          await expect.soft(locator(page)).toBeVisible();
        });
      }
    });
  });

  test("Проверка названий элементов в хэдере", async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test("Проверка атрибутов href у ссылок в хэдере", async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test("Проверка переключения темы light/dark", async ({ page }) => {
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
  
});
