import { browser } from 'k6/experimental/browser';
import { puppeteer } from 'k6/x';

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTUxOGQxZDc2Zjg2NzA0ZjgxNWUzNiIsInJvbCI6InZldGVyaW5hcmlvIiwiaWF0IjoxNzA5NTMwNDM1LCJleHAiOjE3MDk2MTY4MzV9.piZNQ9f7qHA5SdFmF85WGKGtf3baTbd6Gk8bunEQLeQ';
export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  
}

export default async function () {
  
  const page = browser.newPage();
  const browser = puppeteer.launch();
  try {
    await page.goto('https://examen-veterinaria.netlify.app');
    page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    page.close();
  }
  try {
    await page.goto('https://examen-veterinaria.netlify.app/login');

    page.locator('input[name="email"]').type('24heyerunsu@gmail.com');
    page.locator('input[name="password"]').type('@1234H');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

  } finally {
    page.close();
  }
  try {
    await page.goto('https://examen-veterinaria.netlify.app/dashboard');

    const cookies = [{ name: 'Authorization', value: `Bearer ${authToken}` }];
    page.setCookies(cookies);

    page.locator('input[name="nombre"]').type('Orlando');
    page.locator('input[name="apellido"]').type('Tomalá');
    page.locator('input[name="direccion"]').type('Quito');
    page.locator('input[name="telefono"]').type('0988787878');
    page.locator('input[name="email"]').type('heyer.tinoco@epn.edu.ec');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      'body': p => p.locator('div').textContent() == 'Perfil actualizado correctamente',
    });
  } finally {
    page.close();
  }
}
