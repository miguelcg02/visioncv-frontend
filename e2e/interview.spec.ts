import { expect, test } from '@playwright/test';

const formTests = [
  { label: 'Nombre', value: '', error: 'nombre debe contener', showError: true },
  { label: 'Nombre', value: 'Hernando', error: 'nombre debe contener', showError: false },
  { label: 'Número de teléfono', value: '', error: 'número de teléfono debe contener', showError: true },
  { label: 'Número de teléfono', value: '312', error: 'número de teléfono debe contener', showError: true },
  { label: 'Número de teléfono', value: '3121234567', error: 'número de teléfono debe contener', showError: false },
  { label: 'Correo electrónico', value: '', error: 'correo electrónico debe ser válido', showError: true },
  { label: 'Correo electrónico', value: 'aaaaaaa', error: 'correo electrónico debe ser válido', showError: true },
  { label: 'Correo electrónico', value: 'aa@aa.', error: 'correo electrónico debe ser válido', showError: true },
  { label: 'Correo electrónico', value: 'aa@aa.aa', error: 'correo electrónico debe ser válido', showError: false },
  { label: 'Dirección', value: '', error: 'dirección debe contener', showError: true },
  { label: 'Dirección', value: 'asdasd', error: 'dirección debe contener', showError: true },
  { label: 'Dirección', value: 'asdasdasdasd', error: 'dirección debe contener', showError: false },
];

test('El formulario de entrevista debe mostrar los errores solo si los campos no cumplen con los requisitos', async ({
  page,
}) => {
  /*
  await page.goto("/interview");
  await page.getByText("Enviar").click();
  await expect(page.getByText("nombre debe contener")).toBeVisible();

  await page.getByLabel("Nombre").fill("Hernando");
  await expect(page.getByText("nombre debe contener")).not.toBeVisible();
   */

  await page.goto('/interview');

  const firstField = page.locator('form input').first();

  for (const fieldTest of formTests) {
    // Ensure the form is always in an error state
    await firstField.fill('');

    const field = page.getByLabel(fieldTest.label);
    await field.fill(fieldTest.value);
    await page.getByText('Enviar').click();

    if (fieldTest.showError) {
      await expect(page.getByText(fieldTest.error)).toBeVisible();
    } else {
      await expect(page.getByText(fieldTest.error)).not.toBeVisible();
    }
  }
});
