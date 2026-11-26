# 📦 API de Estoque (`estoque-api`)

Servidor Back-End desenvolvido na disciplina de **Projeto Prático Web Back-End** (2º período do curso de Análise e Desenvolvimento de Sistemas). 

O objetivo deste projeto é construir, do zero e sem uso de frameworks externos, uma API RESTful funcional utilizando **Node.js puro** (`node:http`), capaz de receber requisições HTTP, validar métodos, processar rotas e devolver respostas estruturadas no formato **JSON**.

---

## 📋 Índice
1. [Arquitetura e Funcionamento](#-arquitetura-e-funcionamento)
2. [Tecnologias e Ferramentas](#-tecnologias-e-ferramentas)
3. [Pré-requisitos e Instalação](#-pré-requisitos-e-instalação)
4. [Estrutura de Arquivos](#-estrutura-de-arquivos)
5. [Anatomia do Código (`servidor.js`)](#-anatomia-do-código-servidorjs)
6. [Documentação Detalhada das Rotas (Endpoints)](#-documentação-detalhada-das-rotas-endpoints)
7. [Guia de Testes (Navegador e PowerShell)](#-guia-de-testes-navegador-e-powershell)
8. [Solução de Problemas Comuns (Troubleshooting)](#-solução-de-problemas-comuns-troubleshooting)
9. [Cronograma de Evolução](#-cronograma-de-evolução)
10. [Autoria](#-autoria)

---

## 🏗️ Arquitetura e Funcionamento

A aplicação segue o modelo **Cliente-Servidor** sobre o protocolo HTTP:

```text
[ Cliente (Navegador / curl) ] 
       │
       ├──► Envia Requisição HTTP (Ex: GET /produtos)
       ▼
[ Servidor Node.js (Porta 3000) ]
       │
       ├──► Valida o método HTTP (aceita apenas GET)
       ├──► Extrai o caminho limpo da URL (pathname)
       ├──► Consulta os dados armazenados em memória (Array de objetos)
       │
       ◄── Devolve Resposta HTTP (Código Status + Cabeçalho JSON + Corpo)
```

* **Persistência atual:** Os produtos são armazenados em uma constante (`const produtos`) na memória RAM durante a execução do servidor.
* **Formato de troca de dados:** Todas as respostas (incluindo mensagens de erro) utilizam `application/json; charset=utf-8` para garantir compatibilidade com caracteres acentuados e fácil leitura por aplicações Front-End.

---

## 🛠️ Tecnologias e Ferramentas

* **JavaScript (ES2022+ / ES Modules):** Linguagem base do projeto, configurada com `"type": "module"` para permitir importações modernas (`import ... from`).
* **Node.js:** Ambiente de execução (runtime) que permite executar JavaScript fora do navegador.
* **Módulo Nativo `node:http`:** Biblioteca interna do Node.js utilizada para criar o servidor web e gerenciar requisições (`req`) e respostas (`res`).
* **npm (Node Package Manager):** Gerenciador de pacotes e configurações do projeto (`package.json`).
* **Git & GitHub:** Controle de versão e hospedagem do código-fonte na nuvem.

---

## 🚀 Pré-requisitos e Instalação

### 1. Verificar o ambiente
Antes de iniciar, certifique-se de ter o **Node.js** instalado em sua máquina abrindo o terminal e executando:

```powershell
node -v
npm -v
```
*(Ambos os comandos devem retornar os números das versões instaladas).*

### 2. Clonar e configurar o projeto
Caso esteja baixando o repositório em uma nova máquina:

```powershell
# 1. Clonar o repositório
git clone [https://github.com/DevLailaSantos/estoque-api.git](https://github.com/DevLailaSantos/estoque-api.git)

# 2. Acessar a pasta do projeto
cd estoque-api
```

*(Nota: Caso estivesse criando do zero, os comandos utilizados foram `npm init -y` para gerar o `package.json` e `npm pkg set type=module` para habilitar módulos ES).*

### 3. Executar o servidor
Para iniciar o servidor em **modo de desenvolvimento** (que reinicia automaticamente sempre que o arquivo `servidor.js` é salvo):

```powershell
node --watch servidor.js
```

Ou, para execução simples sem reinício automático:

```powershell
node servidor.js
```

Quando o servidor estiver ativo, o terminal exibirá:
```text
Servidor em http://localhost:3000
```

Para encerrar a execução a qualquer momento, pressione **`Ctrl + C`** no terminal.

---

## 📁 Estrutura de Arquivos

```text
estoque-api/
├── package.json   # Manifesto do projeto Node.js (define nome, versão e "type": "module")
├── servidor.js    # Código-fonte principal: criação do servidor, regras HTTP e rotas
└── README.md      # Documentação técnica e guia de uso da API
```

---

## 🧩 Anatomia do Código (`servidor.js`)

O arquivo principal está dividido em quatro responsabilidades claras:

1. **Configuração e Dados em Memória:**
   * Define a constante `PORTA = 3000`.
   * Declara o array `produtos` contendo objetos com `id`, `nome`, `preco` e `estoque`.
2. **Função Auxiliar `enviarJSON(res, status, dados)`:**
   * Padroniza todas as saídas da API.
   * Define o código de status HTTP (`200`, `404`, `405`) e o cabeçalho `Content-Type: application/json; charset=utf-8`.
   * Converte objetos JavaScript em strings JSON através de `JSON.stringify(dados)` e finaliza a conexão com `res.end()`.
3. **Tratamento de Requisições (`http.createServer`):**
   * **Extração de rota:** `new URL(req.url, "http://localhost").pathname` isola apenas o caminho principal da URL, descartando parâmetros de consulta (*query strings*).
   * **Filtro de método:** Bloqueia qualquer requisição diferente de `GET`, definindo o cabeçalho `Allow: GET` e retornando status `405`.
   * **Roteamento condicional:** Utiliza estruturas `if` acompanhadas de `return` (evitando tentativas de enviar múltiplas respostas para a mesma requisição).
4. **Inicialização (`servidor.listen`):**
   * Coloca a aplicação para escutar conexões locais na porta configurada.

---

## 📍 Documentação Detalhada das Rotas (Endpoints)

### 1. Boas-vindas da API
* **Requisição:** `GET /`
* **Status HTTP:** `200 OK`
* **Descrição:** Rota raiz utilizada para confirmar o acesso inicial à API.
* **Resposta JSON:**
  ```json
  {
    "mensagem": "API de estoque"
  }
  ```

### 2. Verificação de Saúde (Health Check)
* **Requisição:** `GET /saude`
* **Status HTTP:** `200 OK`
* **Descrição:** Endpoint de monitoramento que indica se o serviço está ativo e respondendo normalmente.
* **Resposta JSON:**
  ```json
  {
    "status": "ok"
  }
  ```

### 3. Informações do Projeto
* **Requisição:** `GET /sobre`
* **Status HTTP:** `200 OK`
* **Descrição:** Retorna os metadados de identificação e versionamento da aplicação.
* **Resposta JSON:**
  ```json
  {
    "projeto": "API de estoque",
    "versao": "1.0"
  }
  ```

### 4. Listagem de Produtos em Estoque
* **Requisição:** `GET /produtos`
* **Status HTTP:** `200 OK`
* **Descrição:** Calcula dinamicamente a quantidade de itens cadastrados (`produtos.length`) e retorna a lista completa de produtos em memória.
* **Resposta JSON:**
  ```json
  {
    "total": 2,
    "produtos": [
      {
        "id": 1,
        "nome": "Mouse",
        "preco": 79.9,
        "estoque": 12
      },
      {
        "id": 2,
        "nome": "Teclado",
        "preco": 149.9,
        "estoque": 5
      }
    ]
  }
  ```

### 5. Listagem de Categorias
* **Requisição:** `GET /categorias`
* **Status HTTP:** `200 OK`
* **Descrição:** Retorna um array de strings com as categorias de produtos disponíveis na loja.
* **Resposta JSON:**
  ```json
  {
    "categorias": [
      "Periféricos",
      "Informática"
    ]
  }
  ```

### 6. Tratamento de Rota Inexistente
* **Requisição:** `GET /qualquer-rota-nao-cadastrada`
* **Status HTTP:** `404 Not Found`
* **Descrição:** Resposta padrão acionada quando o caminho solicitado não corresponde a nenhuma rota mapeada.
* **Resposta JSON:**
  ```json
  {
    "erro": "Rota não encontrada"
  }
  ```

### 7. Tratamento de Método Não Permitido
* **Requisição:** `POST /produtos` *(ou `PUT`, `PATCH`, `DELETE` em qualquer rota)*
* **Status HTTP:** `405 Method Not Allowed`
* **Cabeçalho Adicional:** `Allow: GET`
* **Descrição:** Bloqueia operações de escrita ou remoção nesta etapa do projeto, informando ao cliente que apenas consultas (`GET`) são aceitas.
* **Resposta JSON:**
  ```json
  {
    "erro": "Método não permitido"
  }
  ```

---

## 🧪 Guia de Testes (Navegador e PowerShell)

Com o servidor em execução (`node --watch servidor.js`), abra um **segundo terminal** no VS Code para validar todos os cenários utilizando `curl.exe -i` (a flag `-i` exibe os cabeçalhos e o código de status HTTP da resposta):

```powershell
# 1. Testar rota raiz (Esperado: HTTP/1.1 200 OK)
curl.exe -i http://localhost:3000/

# 2. Testar verificação de saúde (Esperado: HTTP/1.1 200 OK)
curl.exe -i http://localhost:3000/saude

# 3. Testar informações do projeto (Esperado: HTTP/1.1 200 OK)
curl.exe -i http://localhost:3000/sobre

# 4. Testar listagem de produtos (Esperado: HTTP/1.1 200 OK)
curl.exe -i http://localhost:3000/produtos

# 5. Testar listagem de categorias (Esperado: HTTP/1.1 200 OK)
curl.exe -i http://localhost:3000/categorias

# 6. Testar rota inexistente (Esperado: HTTP/1.1 404 Not Found)
curl.exe -i http://localhost:3000/xyz

# 7. Testar método POST bloqueado (Esperado: HTTP/1.1 405 Method Not Allowed + Allow: GET)
curl.exe -i -X POST http://localhost:3000/produtos
```

---

## 🔧 Solução de Problemas Comuns (Troubleshooting)

| Problema | Causa Provável | Solução |
| :--- | :--- | :--- |
| **`node` não é reconhecido como comando** | O Node.js não está instalado ou não foi adicionado ao `PATH` do Windows. | Reinstale o Node.js (versão LTS) e reinicie o VS Code/terminal. |
| **Alterações no código não aparecem no navegador** | O servidor foi iniciado apenas com `node servidor.js` sem reiniciar após salvar. | Pressione `Ctrl + C` e rode novamente, ou utilize `node --watch servidor.js`. |
| **Erro `EADDRINUSE` (Porta 3000 em uso)** | Outro terminal ou processo já está ocupando a porta `3000`. | Encerre o outro terminal aberto ou altere `const PORTA = 3000` para `3001`. |
| **Erro `ERR_HTTP_HEADERS_SENT`** | Tentativa de chamar `res.end()` mais de uma vez na mesma requisição. | Verifique se todas as chamadas `enviarJSON(...)` possuem `return` antes delas. |

---

## 📈 Cronograma de Evolução

- [x] **Etapa 1 — Fundamentos e Servidor Nativo:** Inicialização do projeto Node.js (`ESM`), criação do servidor HTTP sem frameworks, roteamento manual, respostas em JSON e tratamento de status `200`, `404` e `405`.
- [ ] **Etapa 2 — Manipulação de Dados:** Implementação de rotas `POST`, `PATCH`/`PUT` e `DELETE` com leitura do corpo da requisição (*request body*).
- [ ] **Etapa 3 — Frameworks e Organização:** Migração/estruturação com Express e separação em camadas (rotas, controladores e serviços).
- [ ] **Etapa 4 — Persistência Real:** Conexão com banco de dados para armazenamento permanente dos produtos.

---

## 👩‍💻 Autoria

**Laila Santos**  
Estudante de Análise e Desenvolvimento de Sistemas | Aspirante a Engenheira de Inteligência Artificial  
* GitHub: [@DevLailaSantos](https://github.com/DevLailaSantos)