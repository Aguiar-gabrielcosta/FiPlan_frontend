import test, { expect } from '@playwright/test'

test.describe('Resumo e2e testing', async () => {
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
  })

  test('should navigate between pages', async ({ page }) => {
    // Deve haver a barra de navegação
    await expect(page.locator('nav')).toBeVisible()
    // Apertar o link de planejamento
    await page.click('text=planejamentos')
    // Deve ir para a página de planejamento
    await expect(page).toHaveURL('/resumo/planejamento')
    // Apertar o link de histórico
    await page.click('text=histórico')
    // Deve ir para a página de histórico
    await expect(page).toHaveURL('/resumo/historico')
    // Apertar o link de resumo
    await page.click('text=resumo')
    // Deve voltar para a página de resumo
    await expect(page).toHaveURL('/resumo')
    // Apertar o link sair
    await page.click('text=sair')
    // Deve voltar para a home
    await expect(page).toHaveURL('/')
  })

  test('should have 3 sections', async ({ page }) => {
    // Deve haver a sessão de balanço mensal
    await expect(
      page.locator('section', { hasText: 'Balanço Mensal' }),
    ).toBeVisible()
    // Deve haver a sessão de Acesso Rápido
    await expect(
      page.locator('section', { hasText: 'Acesso Rápido' }),
    ).toBeVisible()
    // Deve haver a barra de Período de Análise
    await expect(
      page.locator('section', { hasText: 'Período de análise' }),
    ).toBeVisible()
  })

  test('should navigate to new plan form', async ({ page }) => {
    // No menu de acesso rápido apertar o botão "+ plano"
    await page.locator('text=+ Plano').click()
    // Deve navegar para a página /resumo/planejamento/plano
    await expect(page).toHaveURL('/resumo/planejamento/plano')
    // Deve haver um formulário
    await expect(page.locator('form')).toBeVisible()
  })

  test('should navigate to new category', async ({ page }) => {
    // No menu de acesso rápido apertar o botão "+ categoria"
    await page.locator('text=+ Categoria').click()
    // Deve navegar para a página /resumo/planejamento/categoria
    await expect(page).toHaveURL('/resumo/planejamento/categoria')
    // Deve haver um formulário ou um aviso que não há planos criados
    const form = page.locator('form')
    const message = page.locator('text=Não foi possível carregar seus planos.')
    await expect(form.or(message)).toBeVisible()
  })

  test('should navigate to new transaction', async ({ page }) => {
    // No menu de acesso rápido apertar o botão "+ transação"
    await page.locator('text=+ Transação').click()
    // Deve navegar para a página /resumo/planejamento/categoria
    await expect(page).toHaveURL('/resumo/planejamento/transacao')
    // Deve haver um formulário ou um aviso que não há planos criados
    const form = page.locator('form')
    const message = page.locator('text=Não foi possível carregar seus planos.')
    await expect(form.or(message)).toBeVisible()
  })
})
