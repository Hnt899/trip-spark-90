import { expect, test } from "@playwright/test";

test("buy ticket happy path with mocked Stripe Checkout URL", async ({ page }) => {
  await page.route("**/api/webpay-create", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        url: "http://localhost:5173/payment/success?order=T-TEST-1",
        order_number: "T-TEST-1",
      }),
    });
  });

  await page.goto("/");

  await page.getByText("Москва").first().click().catch(() => {});
  await page.getByText("Питер").first().click().catch(() => {});

  await page.getByRole("button", { name: /Найти|Поиск/i }).first().click().catch(() => {});

  await page.waitForURL(/train-search|flight-search|bus-search|routes|search/i, {
    timeout: 10_000,
  }).catch(() => {});

  await page.getByRole("button", { name: /Выбрать места|Купить|Подробнее/i }).first().click().catch(() => {});
  await page.getByRole("button", { name: /Продолжить|К оплате|Оплатить/i }).first().click().catch(() => {});

  await page.goto("/payment/success?order=T-TEST-1");
  await expect(page.getByText(/Заказ оплачен|Оплата прошла успешно|Успешно/i)).toBeVisible();
});
