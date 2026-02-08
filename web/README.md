# 🧪 WebDojo – Testes Automatizados com Cypress

Este repositório contém os **testes automatizados end-to-end (E2E)** da aplicação **WebDojo**, utilizando o framework **Cypress**.

A aplicação WebDojo está no **mesmo repositório**, o que facilita o desenvolvimento e a execução dos testes localmente.

---

## 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Cypress](https://www.cypress.io/)
- JavaScript
- Serve (para subir a aplicação em ambiente local)

---

## 🚀 Executando a Aplicação WebDojo

Antes de rodar os testes, é **obrigatório** subir a aplicação WebDojo localmente.

```bash
npm run dev
```

Esse comando utiliza o `serve` para disponibilizar a aplicação em:

```
http://localhost:3000
```

---

## ▶️ Executando os Testes Automatizados

Os testes são executados via **scripts npm**, definidos no `package.json`.

### 🔹 Executar todos os testes (modo headless)

```bash
npm run test
```

- Resolução configurada: **1920x1080**
- Ideal para CI/CD

---

### 🔹 Executar Cypress em modo interativo (UI)

```bash
npm run test:ui
```

- Abre o Cypress Test Runner
- Ideal para desenvolvimento e debug

---

### 🔹 Executar apenas os testes de login (desktop)

```bash
npm run test:login
```

- Resolução: **1920x1080**

---

### 🔹 Executar testes de login simulando mobile

```bash
npm run test:login:mobile
```

- Resolução simulada: **414x896**
- Exemplo: iPhone XR / iPhone 11

---

## 📂 Estrutura do Projeto Cypress

Abaixo está a estrutura principal do diretório `cypress`:

```
cypress/
├── e2e/
│   └── e2e.js
│
├── fixtures/
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
│
├── support/
│   ├── actions/
│   │   └── consultancy.actions.js
│   ├── commands.js
│   ├── e2e.js
│   └── utils.js
```

### 📁 `cypress/e2e`
Contém os **arquivos de testes end-to-end** (`*.cy.js`).  
Cada arquivo representa um fluxo ou funcionalidade da aplicação.

---

### 📁 `cypress/fixtures`
Armazena **dados mockados** usados nos testes.

- `cep.json` → Dados de CEP para testes de endereço
- `consultancy.json` → Dados relacionados a consultorias
- `document.pdf` → Arquivo utilizado em testes de upload

---

### 📁 `cypress/support`
Contém arquivos de **suporte e reutilização**.

#### 🔹 `commands.js`
Comandos customizados do Cypress (`Cypress.Commands.add`).  
Facilita reutilização e legibilidade dos testes.

#### 🔹 `e2e.js`
Arquivo carregado automaticamente antes dos testes.  
Usado para configurações globais.

#### 🔹 `utils.js`
Funções utilitárias reutilizáveis entre testes e actions.

---

### 📁 `cypress/support/actions`
Implementa o padrão **Actions**, separando regras de negócio da escrita dos testes.

- `consultancy.actions.js`  
  Centraliza ações relacionadas ao fluxo de consultoria (ex: criar, editar, validar).

Esse padrão melhora:
- Manutenção
- Reuso
- Organização dos testes

---

## 🧠 Boas Práticas Adotadas

- Separação de responsabilidades (tests, actions, utils)
- Uso de fixtures para dados estáticos
- Comandos customizados para reduzir duplicação
- Testes responsivos (desktop e mobile)
- Resoluções fixas para evitar flakiness

---

## 📌 Observações Importantes

- Sempre execute `npm run dev` antes dos testes
- Verifique se a porta `3000` está livre
- Para novos testes, prefira criar **actions reutilizáveis**
- Mantenha os dados de teste centralizados em `fixtures`

---

## ✅ Conclusão

Este projeto fornece uma base sólida e organizada para testes automatizados da aplicação **WebDojo**, facilitando manutenção, escalabilidade e integração contínua.

Qualquer dúvida ou melhoria, fique à vontade para evoluir a estrutura 🚀
