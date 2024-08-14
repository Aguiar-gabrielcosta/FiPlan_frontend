import test, { expect } from '@playwright/test'

test.describe('Planejamento e2e testing', async () => {
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
    // Acessar página de planejamentos
    await page.locator('text=Planejamentos').click()
  })

  test('should have plan options bar', async ({ page }) => {
    // Deve haver a barra de opções
    await expect(
      page.locator('section', { hasText: 'Planejamentos' }),
    ).toBeVisible()
  })
})
