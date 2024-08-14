import test, { expect } from '@playwright/test'

test.describe('Home e2e testing', async () => {
  test('should have h1 with app name', async ({ page }) => {
    // Abre a home
    await page.goto('/')
    // Deve ter um h1 com o nome da aplicação "FiPlan"
    await expect(page.locator('h1')).toContainText('FiPlan')
  })

  test('should navigate to /login page', async ({ page }) => {
    // Abre a home
    await page.goto('/')
    // Clica no botão Acessar
    await page.click('text=Acessar')
    // Navega para a página de login
    await expect(page).toHaveURL('/login')
    // Possui um campo com label Nome de usuário
    await expect(page.getByLabel('Nome de usuário')).toBeVisible()
  })

  test('should navigate to /cadastro page', async ({ page }) => {
    // Abre a home
    await page.goto('/')
    // Clica no botão Acessar
    await page.click('text=Cadastrar')
    // Navega para a página de login
    await expect(page).toHaveURL('/cadastro')
    // Possui um campo com label Nome de usuário
    await expect(page.getByLabel('Nome de usuário')).toBeVisible()
  })
})
