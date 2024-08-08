import test, { expect } from '@playwright/test'

test.describe('Planejamento e2e testing', async () => {
  test.beforeEach(async ({ page }) => {
    // Abrir a home
    await page.goto('/')
    // Acessar a página resumo
    await page.click('text=Acessar')
    // Acessar a página de planejamento
    await page.click('text=Planejamentos')
  })

  test('should have plan options bar', async ({ page }) => {
    // Deve haver a barra de opções
    await expect(
      page.locator('section', { hasText: 'Planejamentos' }),
    ).toBeVisible()
  })
})
