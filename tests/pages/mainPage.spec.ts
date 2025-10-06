import { test } from "@playwright/test";
import { MainPage } from "../models/MainPage";

let mainPage: MainPage;

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test("Проверка отображения элементов хэдера", async () => {
    await mainPage.checkElementVisability();
  });

  test("Проверка названий элементов в хэдере", async () => {
    await mainPage.checkElementsText();
  });

  test("Проверка атрибутов href у ссылок в хэдере", async () => {
    await mainPage.checkElementsHrefAttribute();
  });

  test("Проверка переключения темы light/dark", async () => {
    await test.step("Первое нажатие кнопки переключения темы", async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step("Второе нажатие кнопки переключения темы", async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step("Проверка смены значения атрибута data-theme", async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });
  test("Проверка установки светлой темы", async () => {
    await test.step("Установка светлой темы", async () => {
      await mainPage.setLightMode();
    });
    await test.step("Скриншотная проверка с активной светлой темой", async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });
  test("Проверка установки тёмной темы", async () => {
    await test.step("Установка тёмной темы", async () => {
      await mainPage.setDarkMode();
    });
    await test.step("Скриншотная проверка с активной тёмной темой", async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
