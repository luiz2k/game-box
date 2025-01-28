# **GAME BOX**

![Demonstração](https://i.imgur.com/0gct1Hf.png)

[Visitar projeto](https://luiz2k-gamebox.vercel.app/)


## **📖 Sobre o Projeto**
Com o **GAME BOX**, os usuários podem gerenciar seus jogos em diferentes categorias, como jogos favoritos, jogos que estão jogando, jogos que abandonaram e jogos que terminaram. Além disso, os usuários pode criar novas categorias personalizadas e adicionar jogos a elas.

A aplicação foi desenvolvida com o objetivo de aprender e aprimorar habilidades em tecnologias como **Next.js**, **Prisma**, **Tailwind CSS**, **TypeScript**, **Stripe**, **Zustand** etc.

### **👨‍💻 Funcionalidades**
Aqui estão algumas das principais funcionalidades e padrões de design adotados no desenvolvimento do projeto.

- #### **Padrão Composition Pattern**
  No desenvolvimento do projeto foi adotado o padrão de projeto **Composition Pattern** para criar facilitar a criação de componentes reutilizaveis.
 
- #### **Autenticação com Auth.js**
  Utilização do **Auth.js** para gerenciar a autenticação dos usuários, e controle das rotas privadas.

- #### **Assinatura com o Stripe**
  Integração com o **Stripe** para permitir que os usuários façam assinaturas e obtenham acesso aos recursos exclusivos. Além disso foi implementado os **webhooks** para receber notificações sobre eventos de assinatura, como alterações de status ou cancelamentos.

- #### **Validação de Dados com Zod**
  Utilização do **Zod** para validação de dados de entrada, garantindo que os dados recebidos estejam de acordo com os critérios definidos.

- #### **Controle de Estados com Zustand**
  Para gerenciar o estados globais da aplicação foi utilizado o **Zustand**. Através delas controlados o estados dos formulários de autenticação e gerenciamento das caixas de jogos.


## **💻 Pré-requisitos**
Antes de começar, garanta que os seguintes itens estejam instalados no seu ambiente:

### **Softwares Necessários**
1. **Node.js e NPM**  
   - Baixe e instale o Node.js com o NPM a partir do site oficial: [https://nodejs.org/pt/download](https://nodejs.org/pt/download).
   - Recomendado instalar a versão 20.0.0 ou superior.

2. **PostgreSQL**  
   - Você pode optar por usar o PostgreSQL de duas formas:
     - **Via Docker:** Use um contêiner para gerenciar o banco de dados.
         - Instale o Docker seguindo as instruções no site oficial: [https://www.docker.com/](https://www.docker.com/).
         - Algumas versões do Docker incluem o Docker Compose. Caso contrário, instale-o separadamente seguindo as instruções do site oficial: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

     - **Instalação local:** Baixe e instale diretamente no seu sistema.
         - Baixe o PostgreSQL do site oficial: [https://www.postgresql.org/](https://www.postgresql.org/).


## **⚙️ Como instalar e rodar o projeto**
Siga os passos abaixo para configurar e executar o projeto:

### **1. Clone o repositório e acesse o diretório**
Execute os comandos abaixo no terminal:
```bash
git clone https://github.com/luiz2k/game-box.git
cd game-box
```

### **2. Instale as dependências do projeto**
```bash
npm install
```


### **3. Configure as ambiente**
1. **Crie o arquivo de variáveis de ambiente**  
   No diretório raiz, copie o arquivo `.env.example` para `.env` e edite as variáveis conforme necessário:
   ```bash
   cp .env.example .env
   ```


### **4. Configuração do Stripe**
   - Crie uma conta em [stripe.com](https://stripe.com/) e obtenha as chaves de API:
     - `STRIPE_SECRET_KEY`
     - `STRIPE_PUBLIC_KEY`
   - Configure também o ID do produto premium:
     - Crie um produto recorrente no Stripe e copie o ID do PREÇO para a variável `STRIPE_PREMIUM_SIGNATURE_ID` no arquivo `.env`.


### **4. Configure o webhook do Stripe para uso local**
Para testar o webhook do Stripe localmente, siga os passos abaixo:

1. Instale a CLI do Stripe:
   - Baixe e instale a CLI do Stripe stripe_X.X.X_windows_x86_64.zip: [https://github.com/stripe/stripe-cli/releases/tag/v1.23.8](https://github.com/stripe/stripe-cli/releases/tag/v1.23.8).

2. Abra o terminal na pasta onde foi feito o download do Stripe CLI

2. Autentique-se na CLI do Stripe:
   ```bash
   stripe.exe login
   ```

3. Configure o webhook local:
   - Substitua `<SEU_ENDPOINT_LOCAL>` pelo endpoint local configurado para receber os eventos do Stripe, por padrão: `http://localhost:3000/api/stripe/webhook`).
   ```bash
   stripe.exe listen --forward-to <SEU_ENDPOINT_LOCAL>
   ```

4. Atualize o arquivo `.env`:
   - Certifique-se de que o segredo do webhook gerado pelo Stripe esteja configurado na variável `STRIPE_WEBHOOK_SECRET` no arquivo `.env`.


### **5. Configure o banco de dados**
1. Você pode optar por configurar o banco de dados de duas formas:
   - **Usando Docker:**
      - Construa e inicie os contêineres do PostgreSQL com:
      ```bash
      docker-compose up
      ```

   - **Instalando localmente:**
      - Baixe o PostgreSQL do site oficial e configure o banco diretamente no seu sistema: [https://www.postgresql.org/](https://www.postgresql.org/).

2. Após configurar o banco de dados, preencha a variável de ambiente `DATABASE_URL` no arquivo `.env`.


### **6. Crie as tabelas no banco de dados e popule-as com dados de exemplo**
1. **Criação das tabelas no banco de dados com Prisma**  
   - Após a inicialização dos containers, execute o seguinte comando para criar as tabelas no banco de dados configurado no Prisma:  
      ```bash
      npx prisma migrate deploy
      ```

2. **Rodar as seeds (dados iniciais)**  
   - Para popular o banco de dados com dados de exemplo (seeds), execute o seguinte comando:  
      ```bash
      npx prisma db seed
      ```


### **5. Compile e inicie o projeto**
1. **Compile o projeto:**
   ```bash
   npm run build
   ```

2. **Inicie o servidor:**
   ```bash
   npm start
   ```


## **🧾 Como fazer assinatura com o Stripe**
Para fazer assinaturas com o **Stripe** do ambiente de desenvolvimento, basta clicar no botão `Faça já sua assinatua!`. Após isso preencha o formulário com os seguintes dados:

- **Número do cartão:** 4242 4242 4242 4242
- **Data de expiração:** Uma data superior ao dia atual

O resto dos campos podem ser preenchidos com qualquer valor.

---

Agora que você concluiu todos os passos, o projeto estará pronto para uso. Certifique-se de que todas as dependências estão instaladas corretamente, o banco de dados esteja configurado e as variáveis de ambiente estejam corretamente configuradas antes de executar o servidor.
