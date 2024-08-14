import test, { expect } from '@playwright/test'

test.describe('Test user oparations', async () => {
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
    // Deve acessar a página /resumo
    await expect(page).toHaveURL('/resumo')
  })

  test('add a plan', async ({ page }) => {
    // Utiliza o menu de acesso rápido para a adição de plano
    await page.locator('text=+ Plano').click()
    // Deve navegar para a página de formulário
    await expect(page).toHaveURL('/resumo/planejamento/plano')
    // Preencher o formulário
    await page.getByPlaceholder('Insira o orçamento do plano').fill('5000')
    await page.getByLabel('Data de ínicio').fill('2024-08-01')
    await page.getByLabel('Data do fim').fill('2024-08-31')
    // Envia os dados
    await page.locator('text=Enviar').click()

    // Deve ser redirecionado à página de planejamento
    await expect(page).toHaveURL('/resumo/planejamento')

    // Deve ser possível selecionar o novo plano
    await page.locator('select').selectOption('01/08/2024 até 31/08/2024')
    // Deve ser possível ver o painel com as informações do plano e de suas categorias
    await expect(page.locator('table', { hasText: 'Plano' })).toBeVisible()
    await expect(page.locator('table', { hasText: 'Categoria' })).toBeVisible()
  })

  test('add a category', async ({ page }) => {
    // Utiliza o menu rápido para a adição de novas categorias
    await page.locator('text=+ Categoria').click()
    // Deve navegar para a página de categorias
    await expect(page).toHaveURL('/resumo/planejamento/categoria')
    // Preencher formulário
    await page
      .getByPlaceholder('Insira o nome da categoria')
      .fill('testCategory')
    await page.getByPlaceholder('Insira o orçamento da categoria').fill('1000')
    await page.locator('select').selectOption('14/08/2024 até 14/09/2024')
    // Envia os dados
    await page.locator('text=Enviar').click()

    // Deve ser redirecionado à página de planejamento
    await expect(page).toHaveURL('/resumo/planejamento')

    // Deve ser possível selecionar o plano
    await page.locator('select').selectOption('14/08/2024 até 14/09/2024')
    // Deve ser possível ver a nova categoria
    await expect(
      page.locator('td', { hasText: 'testCategory' }).first(),
    ).toBeVisible()
  })

  test('add a transaction', async ({ page }) => {
    // Utiliza o menu rápido para a adição de novas transações
    await page.locator('text=+ Transação').click()
    // Deve navegar para a página de transações
    await expect(page).toHaveURL('/resumo/planejamento/transacao')
    // Preencher formulário
    await page.getByPlaceholder('Insira o valor em reais').fill('200')
    await page.getByLabel('Gasto').check()
    await page
      .locator('select', { hasText: 'Selecione um plano' })
      .selectOption('14/08/2024 até 14/09/2024')
    await page
      .locator('select', { hasText: 'Selecione uma categoria' })
      .selectOption('Outros')
    // Envia os dados
    await page.locator('text=Enviar').click()

    // Deve ser redirecionado à página de planejamento
    await expect(page).toHaveURL('/resumo/planejamento')

    // Navegar para a página de histórico
    await page.locator('text=histórico').click()
    await expect(page).toHaveURL('/resumo/historico')
    // Deve ser possível ver a nova transação
    await expect(
      page.locator('td', { hasText: 'R$ 200,00' }).first(),
    ).toBeVisible()
  })

  test('view dashboard', async ({ page }) => {
    // Selecionar o plano
    await page
      .locator('select', { hasText: 'Selecione um plano' })
      .selectOption('14/08/2024 até 14/09/2024')

    // Verificar se há 2 sessões
    await expect(
      page.locator('section', { hasText: 'Gastos por categoria' }),
    ).toBeVisible()
    await expect(
      page.locator('section', { hasText: 'Meta atual' }),
    ).toBeVisible()
  })
})
