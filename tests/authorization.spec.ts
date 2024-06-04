import { test, expect } from '@playwright/test';

test('Авторизация (1. Невалидна 2. Валидна))', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'abcd@mail.ru');
  await page.fill('input[name="password"]', 'invalid');

  await page.click('button[type="submit"]');

  await page.isVisible(
  "text='Validation error: '/six-cities/login''"
  );

  expect(page.url()).toBe('http://localhost:5173/login');
  await page.goto('http://localhost:5173/login');

  await page.fill('input[name="email"]', 'abcd@mail.ru');
  await page.fill('input[name="password"]', 'emm345');

  await Promise.all([
  page.waitForURL('http://localhost:5173'),
  page.click('button[type="submit"]'),
  ]);
});
