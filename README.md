# 🍕 Sistema de Menu Digital - Frontend e Backend

Sistema completo de gerenciamento de cardápio digital com funcionalidades para clientes e administradores, desenvolvido com React/TypeScript (Frontend) e Spring Boot (Backend).

## 📋 Índice

- [Objetivos](#objetivos)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Manual de Uso](#manual-de-uso)
- [API Endpoints](#api-endpoints)
- [Contribuição](#contribuição)

## 🎯 Objetivos

### Principais Objetivos
- **Digitalização do Cardápio**: Transformar o cardápio físico em uma experiência digital interativa
- **Gestão de Pedidos**: Sistema completo para criação, acompanhamento e gerenciamento de pedidos
- **Interface Dupla**: Área para clientes (fazer pedidos) e administradores (gerenciar)
- **Acompanhamento em Tempo Real**: Clientes podem acompanhar o status de seus pedidos
- **Gestão de Produtos**: CRUD completo para produtos do cardápio

### Benefícios
- ✅ Redução de erros na comunicação de pedidos
- ✅ Melhor experiência do cliente
- ✅ Gestão eficiente do estoque e produtos
- ✅ Interface responsiva e moderna
- ✅ Sistema escalável e manutenível

## 🚀 Funcionalidades

### 👥 Área do Cliente
- **Visualização do Cardápio**: Lista de produtos organizados por categoria
- **Carrinho de Compras**: Adicionar/remover produtos com quantidade
- **Finalização de Pedidos**: Formulário com dados do cliente
- **Acompanhamento de Pedidos**: Consulta por telefone com status em tempo real
- **Interface Responsiva**: Funciona em desktop e mobile

### 👨‍💼 Área do Administrador
- **Dashboard**: Estatísticas e visão geral do sistema
- **Gestão de Produtos**: 
  - Listar todos os produtos
  - Criar novos produtos
  - Editar produtos existentes
  - Ativar/desativar produtos
- **Gestão de Pedidos**:
  - Visualizar todos os pedidos
  - Atualizar status dos pedidos
  - Filtros por status
- **Estatísticas**: Contadores e métricas do negócio

### 📊 Status dos Pedidos
- 🟡 **Pendente**: Pedido recebido, aguardando confirmação
- 🔵 **Confirmado**: Pedido confirmado pelo restaurante
- 🟢 **Pronto**: Pedido pronto para entrega/retirada
- 🔴 **Cancelado**: Pedido cancelado

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **React Query (TanStack Query)** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP para requisições
- **CSS Modules** - Estilização modular

### Backend
- **Spring Boot 3** - Framework Java para aplicações web
- **Spring Data JPA** - Persistência de dados
- **MySQL** - Banco de dados relacional
- **Lombok** - Redução de código boilerplate
- **Maven** - Gerenciamento de dependências

### Ferramentas
- **Git** - Controle de versão
- **npm** - Gerenciador de pacotes Node.js
- **Postman/Insomnia** - Teste de APIs (recomendado)

## 📁 Estrutura do Projeto

```
📦 Sistema Menu Digital
├── 🖥️ Frontend (React/TypeScript)
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── Navbar.tsx       # Barra de navegação
│   │   │   ├── ProdutoLista.tsx # Lista de produtos
│   │   │   ├── PaginaAdmin.tsx  # Painel administrativo
│   │   │   ├── PaginaCliente.tsx # Área do cliente
│   │   │   ├── MenuInicial.tsx  # Menu de seleção
│   │   │   └── FormularioProduto.tsx # Formulário de produtos
│   │   ├── contexts/            # Contextos React
│   │   │   └── CarrinhoContext.tsx # Contexto do carrinho
│   │   ├── model/               # Tipos TypeScript
│   │   │   └── Produto.ts       # Definições de tipos
│   │   ├── service/             # Serviços de API
│   │   │   └── api.ts           # Configuração e endpoints
│   │   └── main.tsx             # Ponto de entrada
│   ├── package.json             # Dependências
│   └── vite.config.ts           # Configuração Vite
│
└── 🔧 Backend (Spring Boot)
    ├── src/main/java/com/example/menubackend/
    │   ├── controller/          # Controladores REST
    │   │   ├── ProdutoController.java
    │   │   ├── PedidoController.java
    │   │   └── DashboardController.java
    │   ├── service/             # Lógica de negócio
    │   │   ├── ProdutoService.java
    │   │   └── PedidoService.java
    │   ├── model/               # Entidades JPA
    │   │   ├── Produto.java
    │   │   └── Pedido.java
    │   ├── dto/                 # Objetos de transferência
    │   │   ├── ProdutoDTO.java
    │   │   └── PedidoDTO.java
    │   ├── repository/          # Repositórios de dados
    │   └── config/              # Configurações
    │       └── CorsConfig.java  # Configuração CORS
    ├── pom.xml                  # Dependências Maven
    └── application.properties   # Configurações da aplicação
```

## ⚙️ Instalação e Configuração

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **Java 17** ou superior
- **MySQL** (versão 8.0 ou superior)
- **Git**

### 1. Clone o Repositório
```bash
# Clone o repositório do frontend
git clone <url-do-repositorio-frontend>
cd Front-e-Back-Separados-master

# Clone o repositório do backend (em pasta separada)
git clone <url-do-repositorio-backend>
cd BackComFront-master
```

### 2. Configuração do Backend

#### 2.1 Configurar Banco de Dados
1. Crie um banco MySQL chamado `menu`
2. Configure as credenciais em `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/menu?createDatabaseIfNotExist=true
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

#### 2.2 Executar o Backend
```bash
cd BackComFront-master
mvn spring-boot:run
```
O backend estará disponível em: `http://localhost:8080`

### 3. Configuração do Frontend

#### 3.1 Instalar Dependências
```bash
cd Front-e-Back-Separados-master
npm install
```

#### 3.2 Executar o Frontend
```bash
npm run dev
```
O frontend estará disponível em: `http://localhost:5173` ou `http://localhost:5174`

## 📖 Manual de Uso

### 🎯 Menu Inicial
Ao acessar o sistema, você verá duas opções:
- **👥 Área do Cliente**: Para fazer pedidos
- **👨‍💼 Área do Administrador**: Para gerenciar o sistema

### 👥 Como Usar - Área do Cliente

#### 1. Visualizar o Cardápio
- Acesse a área do cliente
- Visualize todos os produtos disponíveis
- Use as categorias para filtrar produtos

#### 2. Fazer um Pedido
1. **Adicionar ao Carrinho**: Clique em "🛒 Adicionar ao Carrinho" nos produtos desejados
2. **Verificar Carrinho**: Clique no botão "🛒 Carrinho" na navbar
3. **Finalizar Pedido**: Clique em "Finalizar Pedido"
4. **Preencher Dados**: Digite nome e telefone
5. **Confirmar**: Clique em "Confirmar Pedido"

#### 3. Acompanhar Pedidos
1. Clique em "📋 Meus Pedidos" na navbar
2. Digite seu telefone
3. Clique em "🔍 Consultar Pedidos"
4. Visualize o status de todos os seus pedidos

### 👨‍💼 Como Usar - Área do Administrador

#### 1. Dashboard
- **Estatísticas Gerais**: Total de produtos, pedidos, etc.
- **Pedidos Recentes**: Últimos 5 pedidos realizados
- **Visão Geral**: Status dos pedidos em tempo real

#### 2. Gestão de Produtos

##### Listar Produtos
- Acesse a aba "🍕 Produtos"
- Visualize todos os produtos cadastrados
- Veja status (ativo/inativo) de cada produto

##### Criar Novo Produto
1. Clique em "➕ Novo Produto"
2. Preencha os campos:
   - **Nome**: Nome do produto
   - **Descrição**: Descrição detalhada
   - **Link Imagem**: URL da imagem do produto
   - **Categoria**: Categoria do produto
   - **Preço**: Valor em reais
   - **Status**: Ativo ou Inativo
3. Clique em "Cadastrar"

##### Editar Produto
1. Na lista de produtos, clique em "✏️ Editar"
2. Modifique os campos desejados
3. Clique em "Atualizar"

##### Ativar/Desativar Produto
- Clique em "🟢 Ativar" ou "🔴 Desativar" conforme necessário

#### 3. Gestão de Pedidos

##### Visualizar Pedidos
- Acesse a aba "📋 Pedidos"
- Visualize todos os pedidos realizados
- Veja detalhes completos de cada pedido

##### Atualizar Status
1. Localize o pedido desejado
2. Use o dropdown de status
3. Selecione o novo status:
   - **Pendente** → **Confirmado** → **Pronto**
   - **Cancelado** (quando necessário)

## 🔌 API Endpoints

### Produtos
```
GET    /api/cardapio                    # Listar produtos ativos
GET    /api/cardapio/categoria/{cat}    # Produtos por categoria
GET    /api/cardapio/buscar?nome={nome} # Buscar por nome
GET    /api/cardapio/{id}               # Produto específico
GET    /api/cardapio/categorias         # Listar categorias

# Admin
GET    /api/admin/produtos              # Listar todos os produtos
GET    /api/admin/produtos/{id}         # Produto por ID
POST   /api/admin/produtos              # Criar produto
PUT    /api/admin/produtos/{id}         # Atualizar produto
PATCH  /api/admin/produtos/{id}/toggle-status # Ativar/desativar
DELETE /api/admin/produtos/{id}         # Deletar produto
```

### Pedidos
```
POST   /api/pedidos                     # Criar pedido
GET    /api/pedidos/cliente/{telefone}  # Pedidos por telefone
GET    /api/pedidos/{id}                # Pedido específico

# Admin
GET    /api/admin/pedidos               # Listar todos os pedidos
GET    /api/admin/pedidos/status/{status} # Pedidos por status
PATCH  /api/admin/pedidos/{id}/status/{status} # Atualizar status
DELETE /api/admin/pedidos/{id}          # Deletar pedido
```

### Dashboard
```
GET    /api/admin/dashboard/estatisticas # Estatísticas gerais
GET    /api/admin/dashboard/resumo-pedidos # Resumo de pedidos
```

## 🚀 Funcionalidades Avançadas

### Tratamento de Imagens
- **Fallback Automático**: Imagem padrão quando a URL não carrega
- **Validação**: Verificação de URLs válidas
- **Otimização**: Imagens responsivas

### Cache e Performance
- **React Query**: Cache inteligente de dados
- **Invalidação**: Atualização automática quando necessário
- **Loading States**: Estados de carregamento para melhor UX

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para diferentes tamanhos de tela
- **Touch Friendly**: Interface otimizada para toque

## 🔧 Configurações Avançadas

### Variáveis de Ambiente
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:8080/api

# Backend (application.properties)
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/menu
```

### CORS
O backend está configurado para aceitar requisições dos seguintes domínios:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:3000`

## 🐛 Solução de Problemas

### Problemas Comuns

#### 1. Backend não inicia
- Verifique se o MySQL está rodando
- Confirme as credenciais do banco
- Verifique se a porta 8080 está livre

#### 2. Frontend não conecta com backend
- Verifique se o backend está rodando
- Confirme a URL da API no arquivo `api.ts`
- Verifique as configurações CORS

#### 3. Imagens não carregam
- Verifique se as URLs das imagens são válidas
- Confirme se as imagens são acessíveis publicamente
- Use URLs de serviços como Unsplash ou Imgur

#### 4. Pedidos não aparecem
- Verifique se há produtos cadastrados
- Confirme se os produtos estão ativos
- Verifique os logs do backend

### Logs e Debug
- **Frontend**: Use o DevTools do navegador (F12)
- **Backend**: Logs aparecem no console onde foi iniciado
- **Banco de Dados**: Verifique diretamente no MySQL

## 🤝 Contribuição

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Código
- **Frontend**: Use TypeScript, componentes funcionais, hooks
- **Backend**: Use Java 17+, Spring Boot, padrões REST
- **Commits**: Use mensagens descritivas em português
- **Documentação**: Mantenha o README atualizado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas, sugestões ou problemas:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento
- Consulte a documentação da API

---

**Desenvolvido com ❤️ para modernizar a experiência de pedidos em restaurantes** 