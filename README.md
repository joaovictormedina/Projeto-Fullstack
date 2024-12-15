# PaternerShip: Landing Page de Resgate de Pontos

## 1. Introdução

### Objetivo do Projeto
O projeto consiste no desenvolvimento de uma landing page destinada a arquitetos, engenheiros, designers e consultores para que possam acumular pontos através de compras realizadas na loja de consultores. Esses pontos podem ser trocados por viagens ou prêmios, mediante solicitação de resgate pelo site e aprovação de um administrador.

### Resumo
O site é uma aplicação multi-page, contendo 8 páginas principais, com funcionalidades como criação de conta, login, recuperação de senha, solicitação de resgate e gerenciamento administrativo.

Desenvolvido com as tecnologias React, Vite e CSS, utiliza a biblioteca Mantine para componentes de interface. O design foi projetado no Figma, com uma abordagem responsiva para dispositivos de diferentes tamanhos.

---

## 2. Estrutura do Projeto

### Localização do Projeto
**Caminho local:**
`C:\Users\valmi\OneDrive\Documentos\GitHub\Pantern-Ship`

O projeto é dividido em duas partes:
- **Frontend** (pasta `front end`)
- **Backend** (pasta `back end`)

### Estrutura do Frontend

**Pastas principais:**
- **`src/`**: Contém os arquivos principais da aplicação, incluindo componentes, imagens, páginas e estilos.
  - **`components/`**: Contém os componentes reutilizáveis como Header, Footer, Cards, Carrossel e formulários.
  - **`images/`**: Organização de imagens:
    - **`hero/`**: Imagens do banner principal.
    - **`partners/`**: Logos de parceiros.
    - **`promotions/`**: Imagens relacionadas a promoções.
  - **`pages/`**: Contém os arquivos de cada página do site (Home, Promoções, Pacotes, etc.).
  - **`services/`**: Destinado a funções auxiliares ou futuras integrações com APIs.
  - **`styles/`**: Arquivos de estilização CSS.

**Arquivos principais:**
- **`index.html`**: Estrutura base do HTML.
- **`App.jsx`**: Componente raiz da aplicação React.
- **`main.jsx`**: Arquivo de entrada para renderização.
- **`vite.config.js`**: Configurações do Vite para build e desenvolvimento.

### Estrutura do Backend

**Pastas principais:**
- **`src/`**: Contém os arquivos principais do backend.
- **`test/`**: Destinada a testes unitários ou de integração (ainda não implementados).

**Arquivos principais:**
- **`ormconfig.js`**: Configurações do ORM (Object-Relational Mapping).
- **`nest-cli.json`**: Configuração do framework Nest.js.
- **`tsconfig.json` e `tsconfig.build.json`**: Configurações do TypeScript.

---

## 3. Funcionalidades

### Funcionalidades Principais
1. **Criação de Conta:**
   - Formulário de cadastro com campos de validação.
   - Confirmação de conta através de senha.

2. **Login e Recuperação de Senha:**
   - Sistema de login com validação.
   - Recuperação de senhas através de um formulário dedicado.

3. **Solicitação de Resgate:**
   - O usuário pode solicitar resgate de prêmios na página de pacotes.
   - O administrador é responsável por aprovar ou negar os pedidos.
   - Funcionalidade ainda não funcional (simulação apenas no frontend).

4. **Administração:**
   - Permissões para:
     - Adicionar, editar ou remover pontos dos usuários.
     - Criar, editar ou excluir cards de promoções e pacotes.
     - Alterar os valores de resgate e adicionar novos prêmios.
   - Página dedicada para o administrador (interface em progresso).

---

## 4. Tecnologias Utilizadas

- **Frontend:**
  - React + Vite
  - CSS (com suporte da biblioteca Mantine)
- **Backend:**
  - Node.js com Nest.js
- **Design:**
  - Figma (planejamento de layout e design).

---

## 5. Design e Responsividade

### Paleta de Cores e Estilo
- **Cores:** Tons suaves relacionados à arquitetura.
- **Estilo:** Bordas arredondadas para transmitir sofisticação.

### Responsividade
- Trabalhada para dispositivos de todos os tamanhos, incluindo smartphones, tablets e desktops.
- Testado em navegadores modernos para garantir compatibilidade.

---

## 6. Instruções para Execução

### Requisitos
- **Node.js:** Certifique-se de que a versão mais recente esteja instalada.
- **Instalação das Dependências:**
  - Frontend: `npm install` para instalar pacotes do React e Mantine.
  - Backend: `npm install` para instalar dependências do Node.js.

### Passos para Rodar Localmente
1. Clone o repositório do projeto.
2. Navegue até as pastas `front end` e `back end`.
3. Execute os seguintes comandos em cada diretório:
   - `npm install` para instalar as dependências.
   - `npm run dev` para iniciar o ambiente de desenvolvimento.

---

## 7. Possibilidades Futuras

1. **Integrações:**
   - Integração de um chatbot para suporte ao usuário.
   - Tornar o sistema de resgate funcional com comunicação entre frontend e backend.

2. **Melhorias no Painel de Admin:**
   - Completar a interface gráfica.
   - Implementar módulos de relatórios e estatísticas.

---

## 8. Equipe de Desenvolvimento

- **Valmir Domingues Pedroso**
- **Gabriel Santos Teixeira**
- **Henrique Moura**
- **João Vitor Medina**
- **Vitor Barreto**

---

