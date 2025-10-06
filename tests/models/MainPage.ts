import test, { expect, Locator, Page } from "@playwright/test";

interface Element {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Element[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page) =>
          page.getByRole("link", { name: "Playwright logo Playwright" }),
        name: "Playwright logo",
        text: "Playwright",
        attribute: {
          type: "href",
          value: "/",
        },
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
        locator: (page) =>
          page.getByRole("heading", { name: "Playwright enables reliable" }),
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
        },
      },
    ];
  }

  async openMainPage() {
    await this.page.goto("https://playwright.dev/");
  }

  async checkElementVisability() {
    for (const { locator, name } of this.elements) {
      await await test.step(`${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await await test.step(`${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(
            attribute.type,
            attribute.value
          );
        });
      }
    }
  }

  async clickSwitchLightModeIcon() {
    await this.page
      .getByRole("button", { name: "Switch between dark and light" })
      .click();
  }

  async checkDataThemeAttributeValue() {
    await expect(this.page.locator("html")).toHaveAttribute(
      "data-theme",
      "dark"
    );
  }

  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector("html")?.setAttribute("data-theme", "light");
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector("html")?.setAttribute("data-theme", "dark");
    });
  }

  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot("pageWithLightMode.png");
  }

  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot("pageWithDarkMode.png");
  }
}
