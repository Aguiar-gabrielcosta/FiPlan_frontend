
# FiPlan - Front-End - v0.1.0

## Feito com Next.js

Este é um projeto [Next.js](https://nextjs.org/) inicializado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Para saber mais sobre Next.js, dê uma olhada nos recursos a seguir:

- [Documentação Next.js](https://nextjs.org/docs) - aprenda sobre as funcionalidades e API do Next.js.
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo do Next.js

Você pode conferir o [repositório Next.js no GitHub](https://github.com/vercel/next.js/) - seu feedback e contribuições são bem-vindas.

## Descrição

Este é o repositório do front-end da aplicação [FiPlan](https://fiplan.vercel.app/). Nela contem a código fonte para o servidor Next para servir a interface de usuário do web app.

## Instalação

```bash
$ pnpm install
```

## Variáveis de ambiente

Esta aplicação depende da comunicação com uma API propria, contida neste [repositório](https://github.com/Aguiar-gabrielcosta/FiPlan_backend).

```bash
# API
API_URL # URL base para a API
```

## Rodando a aplicação localmente

Primeiro, tenha certeza de que instalou as dependências, como explicado acima.

Depois, pode utilizar os seguintes comandos, para sua finalidade.

```bash
# desenvolvimento
$ pnpm run dev

# build
$ pnpm run build

# produção
$ pnpm run start
```

## Testes

```bash
# testes E2E
$ pnpm exec playwright test
```
