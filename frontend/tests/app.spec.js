// frontend/tests/app.spec.js
import { test, expect } from "@playwright/test";

test("home and discover pages load correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // لینک Discover در نوار ناوبری (داخل <nav>) را انتخاب می‌کنیم
  const navDiscoverLink = page.locator('nav a[href="/discover"]').first();

  // باید قابل مشاهده باشد
  await expect(navDiscoverLink).toBeVisible();

  // کلیک روی لینک Discover در ناوبری
  await navDiscoverLink.click();

  // هدر Discover باید نمایش داده شود
  await expect(
    page.getByRole("heading", { name: "Discover Movies" })
  ).toBeVisible();

  // حداقل یک کارت فیلم
  await expect(page.getByTestId("movie-card").first()).toBeVisible();
});

test("discover search filter hides movies when no match", async ({ page }) => {
  await page.goto("http://localhost:5173/discover");

  // صبر کن تا حداقل یک کارت فیلم لود شود
  await expect(page.getByTestId("movie-card").first()).toBeVisible();

  // یک عبارت الکی سرچ کن که هیچ فیلمی با آن مطابقت نداشته باشد
  await page.getByPlaceholder("Search by title...").fill("asldkjasldkjasldkj");

  // هیچ کارت فیلمی نباید دیده شود
  await expect(page.getByTestId("movie-card")).toHaveCount(0);

  // پیام "No movies match your search." باید نمایش داده شود
  await expect(
    page.getByText("No movies match your search.")
  ).toBeVisible();
});