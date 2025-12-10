// tests/app.spec.js
import { test, expect } from "@playwright/test";

test("home and discover pages load and show movies", async ({ page }) => {
  // صفحه اصلی سایت دیپلوی‌شده (با baseURL از config)
  await page.goto("/");

  // لینک Discover در ناوبری باید قابل مشاهده باشد
  await expect(page.getByRole("link", { name: /Discover/i })).toBeVisible();

  // رفتن به صفحه Discover
  await page.getByRole("link", { name: /Discover/i }).click();

  // heading Discover باید دیده شود
  await expect(
    page.getByRole("heading", { name: /Discover Movies/i })
  ).toBeVisible();

  // متن راهنمای لیست فیلم‌ها
  await expect(
    page.getByText(/Popular movies from TMDB/i)
  ).toBeVisible();

  // ✅ به جای دکمه‌ی Add to Favorites، وجود خطوط امتیازدهی با ستاره را چک می‌کنیم
  // چون برای هر فیلم یک خط مثل "⭐ 7.5 | 📅 2024-09-01" داریم
  const ratingLines = await page.getByText(/⭐/).all();
  expect(ratingLines.length).toBeGreaterThan(0);
});