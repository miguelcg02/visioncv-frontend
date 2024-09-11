import { test, expect } from '@playwright/test';

test('Empezamos en la pagina de inicio', async ({ page }) => {
  await page.goto('/');
  const title = page.getByText('Bienvenido');
  await expect(title).toBeVisible();
});

test("El boton de la pagina de inicio lleva a 'Interview'", async ({ page }) => {
  await page.goto('/');
  await page.getByText('Comenzar').click();
  await expect(page).toHaveURL('/interview');
});
