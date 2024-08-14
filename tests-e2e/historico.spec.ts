import test, { expect } from '@playwright/test'

test.describe('Histórico e2e testing', async () => {
  test.beforeEach(async ({ page }) => {
    // Abrir a home
    await page.goto('/')
    // Acessar a página resumo
    await page.click('text=Acessar')
    // Fazer o login no usuário de teste
    await page.getByPlaceholder('Insira o nome de usuário').fill('testUser')
    await page.getByPlaceholder('Insira sua senha').fill('test123456')
    // Enviar credenciais
    await page.locator('text=Enviar').click()
    // Acessar a página de histórico
    await page.locator('text=Histórico').click()
  })

  test('should have plan options bar', async ({ page }) => {
    // Deve haver a sessão do Histórico de Transações
    await expect(
      page.locator('section', { hasText: 'Histórico de Transações' }),
    ).toBeVisible()
  })
})
