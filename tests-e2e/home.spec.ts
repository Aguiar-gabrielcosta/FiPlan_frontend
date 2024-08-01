import test, { expect } from '@playwright/test'

test.describe('Home e2e testing', async () => {
  test('should have h1 with app name', async ({ page }) => {
    // Abre a home
    await page.goto('/')
    // Deve ter um h1 com o nome da aplicação "FiPlan"
    await expect(page.locator('h1')).toContainText('FiPlan')
  })

  test('should navigate to /resumo page', async ({ page }) => {
    // Abre a home
    await page.goto('/')
    // Clica no botão Acessar
    await page.click('text=Acessar')
    // Navega para aa página resumo
    await expect(page).toHaveURL('/resumo')
    // Possui um h1 com o nome da aplicação "FiPlan"
    await expect(page.locator('h1')).toContainText('FiPlan')
  })
})
