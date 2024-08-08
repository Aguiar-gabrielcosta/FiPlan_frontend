import test, { expect } from '@playwright/test'

test.describe('Histórico e2e testing', async () => {
  test.beforeEach(async ({ page }) => {
    // Abrir a home
    await page.goto('/')
    // Acessar a página resumo
    await page.click('text=Acessar')
    // Acessar a página de planejamento
    await page.click('text=Histórico')
  })

  test('should have plan options bar', async ({ page }) => {
    // Deve haver a sessão do Histórico de Transações
    await expect(
      page.locator('section', { hasText: 'Histórico de Transações' }),
    ).toBeVisible()
  })
})
