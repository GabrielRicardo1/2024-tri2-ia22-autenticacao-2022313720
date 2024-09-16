##### 2024-IA22-2TRI
# *iniciando o tutorial* 👍

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://media.giphy.com/media/YtCAXWS94FZbWiKmKH/giphy.gif?cid=ecf05e47oncgcuvvpoeulkadb6geg0jqwa4z76tr4fxzez00&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
</div>


###### (em alguns momentos vou parecer repetitivo e falar coisas óbvias, basicamente pq esse tutorial foi feito pra qualquer tongão fazer.) `AVISO` o codespace as vezes é meio lento, então não se assuste se as coisas não funcionarem imediatamente.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# primeiramente, preciso te explicar o que nós vamos fazer e como funciona. sugiro que você preste atenção simplesmente pq vale nota para nós dois.

## o que é Autenticação de Usuários (*Single Server*)?
### bom, basicamente é um processo de verificação da identidade de um usuário que está tentando acessar um sistema. No modelo Single Server, um único servidor gerencia todo o processo de autenticação, mantendo informações sobre usuários, como senhas e dados de sessão.

### `1.` O usuário envia suas credenciais (geralmente um nome de usuário e senha) para o servidor.

### `2.` O servidor verifica se essas credenciais estão corretas comparando com o que está armazenado em seu banco de dados.

### `3.` Se as credenciais forem válidas, o usuário é autenticado e pode acessar os recursos protegidos.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

## e quanto a `Autenticação` vs. `Autorização`?
### Mesmo os termos sejam usados frequentemente juntos, eles têm significados diferentes:

### `*` Autenticação: É o processo de verificar quem é o usuário. Exemplo: quando você faz login com seu nome de usuário e senha, você está se autenticando.

### `*` Autorização: É o processo de determinar se um usuário autenticado tem permissão para acessar um recurso específico. Exemplo: depois de autenticado, o sistema verifica se você tem permissão para acessar determinada página ou funcionalidade.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="ignore-imagens/autentvsauto.png" />
</div>

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

### a primeira coisa que devemos fazer antes de começar é criar um codespace. não sabe fazer isso? veja o tutorial abaixo:
<a href="https://github.com/prof-varela/tutoriais/blob/main/tutorial/codespace.md" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">Tutorial Codespace</a>


# `1.`iniciando o nosso projeto:
### abra o terminal (ctrl + ' ) e execute os comandos abaixo. talvez apareça uma mensagem de erro/atenção mas não se preocupe, pode executar tudo de uma vez! 

```
npm init -y && \
npm install express cors sqlite3 sqlite && \
npm install --save-dev typescript nodemon ts-node @types/express @types/cors && \
npx tsc --init && \
mkdir -p src public src/services src/key-mappers && \
touch src/app.ts src/database.ts public/index.html public/index2.css public/index.css public/listagem.html public/main.js initial-users.json src/services/user.services.ts src/key-mappers/addAliasDots.ts src/key-mappers/index.ts

```

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `2.` agora, vamos ao código
#### primeiro de tudo, não se preocupe com erros temporários no código. faça todo o tutorial (até a parte dos testes) e se algum erro persistir de atenção a ele.
### vamos começar pelo back-end e por fim estilizamos.
### no arquivo `database.ts` da pasta `sr` adicione o seguinte código:

```ts
import { open, Database } from "sqlite"
import { Database as driver } from "sqlite3"
import { addAliasDots as dots } from "./key-mappers"

let instance: Database | null = null

const filename = "./database.sqlite"

export const database = async () => {
  if (instance)
    return instance

  const db =
    await open({ filename, driver })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `)

  const users: any[] = require("../initial-users.json")
  users.forEach(async user => await db.run(`
      INSERT INTO users (name, email, username, password) 
      SELECT :name, :email, :username, :password
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = :username)
    `, dots(user)
  ))

  return instance = db
}

database()
```
### Esse código configura um banco de dados simples para guardar informações de usuários, como nome, email, nome de usuário e senha. Ele funciona assim:

#### `1.` Cria um banco de dados se ainda não existir, como um arquivo para armazenar informações.
#### `2.` Faz uma tabela chamada users para organizar esses dados, como se fosse uma planilha com colunas para o nome, email, etc.
#### `3.` Lê um arquivo com uma lista de usuários iniciais (initial-users.json) e adiciona esses usuários ao banco de dados, mas só se o nome de usuário ainda não estiver lá (para evitar repetir o mesmo usuário).

### Basicamente, ele prepara o banco de dados e preenche com informações iniciais de maneira automática.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `3.` vamos configurar nossos arquivos `json`
## `01)` no  `initial-users.json` adicione o seguinte código:

```json
[
    {
      "name": "paciente 0",
      "email": "cobaia@gmail.com",
      "username": "coutinho",
      "password": "senha"
    },
    
    {
      "name": "lacaio panguão",
      "email": "lacaio@gmail.com",
      "username": "lacaio",
      "password": "senha"
    }
  ]
```
### Essas informações serão usadas pelo código anterior para preencher o banco de dados com esses dois usuários de teste.

## `02)` agora no nosso `package.json` substitua tudo por esse código:

```json
{
  "name": "2024-ia22-2tri",
  "version": "1.0.0",
  "description": "Programação II",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx nodemon src/app.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "sqlite": "^5.1.1",
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "nodemon": "^3.1.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  }
}
```
#### esse arquivo contém as informações básicas sobre o projeto e suas dependências.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `4.` no arquivo `app.ts` que está dentro da pasta `src` adicione:

```ts
import express, { RequestHandler } from 'express'
import * as userServices from './services/user.services'
import { randomUUID } from 'crypto'
import { database } from './database';

const port = 4400
const app = express()

app.use(express.json())
app.use(express.static(__dirname + '/../public'))

type user = { id: number, name: string, email: string, username: string, password: string }
const logged: { [token: string]: user } = {}


/**
 * Esta função verifica por username se já existem tokem criado para o usuário
 * @param username 
 * @returns 
 */
const isAlreadyLogged = (username: string) => {
  for (const token in logged)
    if (logged[token].username === username)
      return token
  return false
}

// Check if user is logged middleware
const middlewareLogged: RequestHandler = (req, res, next) => {
  const token = req.params.token
  if (!token)
    return res.status(404).json({ error: "Token não informado" })
  if (!logged[token])
    return res.status(401).json({ error: "Token inválido" })
  next()
}

const middlewareSouDono: RequestHandler = (req, res, next) => {
  const { id, token } = req.params;
  if (!logged[token]) {
    return res.status(401).json({ error: "Token inválido" });
  }
  if (logged[token].id+"" !== id) {
    return res.status(401).json({ error: "Você não tem permissão para atualizar este usuário" });
  }
  next()
}

// TOKEN CREATE :: LOGIN
app.post("/token", async (req, res) => {
  const { username, password } = req.body
  const tokenAlread = isAlreadyLogged(username)
  if (tokenAlread)
    return res.status(401).json({
      error: "Usuário já está logado", 
      token: tokenAlread
    })
  const user = await userServices.findUserByLoginPassword(username, password)
  if (!user)
    return res.status(401).json({ error: "Usuário ou senha inválidos" })
  const token = randomUUID()
  logged[token] = user
  return res.json({ token })
})

app.put('/users/:id/:token', middlewareSouDono, async (req, res) => {
  const db = await database();
  const { id, token } = req.params;
  const { name, email } = req.body;
  const userId = parseInt(id, 10);    
  await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
  const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);

  res.json(user);
});


app.delete('/users/:id/:token', middlewareSouDono, async (req, res) => {
  const db = await database();
  const { id } = req.params;
  await db.run('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'User deleted' });
});

app.get("/users/:token", middlewareLogged, async (req, res) => {
  const users = await userServices.getAllUsers()
  return res.json(users)
})





// TOKEN CHECK :: VALIDATE
app.get("/token/:token", (req, res) => {
  const token = req.params.token
  if (!token)
    return res.status(401).json({ error: "Token não informado" })
  if (!logged[token])
    return res.status(401).json({ error: "Token inválido" })
  return res.json({ ...logged[token], password: undefined })
})

// TOKEN DELETE :: LOGOUT
app.delete("/token/:token", (req, res) => {
  const token = req.params.token
  if (!token)
    return res.status(401).json({ error: "Token não informado" })
  if (!logged[token])
    return res.status(401).json({ error: "Token inválido" })
  delete logged[token]
  return res.status(204).send()
})

// LISTAR USUÁRIOS SOMENTE SE ESTIVER LOGADO
app.get("/users/:token", middlewareLogged, async (req, res) => {
  const users = await userServices.getAllUsers()
  return res.json(users)
})

app.listen(port, () => console.log(`⚡ Server is running on port ${port}`))
```
### é um servidor web simples usando o framework Express que permite gerenciar usuários e autenticação através de tokens. Ele tem as seguintes funcionalidades:

#### `01)` Autenticação via Token
#### `02)` Mecanismos de Verificação e Controle
#### `03)` Banco de Dados SQLite
#### `04)` Rotas Implementadas: `POST`, `PUT`, `DELETE` (se tiver interesse em entender como funcionam essas três, tenho um tutorial sobre isso no meu github, mas veja depois. foque no projeto agora.) 
#### GET `/users/:token` : Retorna uma lista de todos os usuários, desde que o token seja válido
#### GET `/token/:token`: Verifica se o token é válido e retorna os dados do usuário (exceto a senha).
#### DELETE `/token/:token`: Faz logout, removendo o token do armazenamento em memória, invalidando o login do usuário.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `5.` key-mappers.
### dentro da pasta `src`, vai ter outra pasta chamada `key-mappers` e dentro dela um arquivo de nome `addAliasDots.ts`. adicione o seguinte arquivo nele:

```ts
export default function addAliasDots(obj: any) {
    let newObj: any = {}
    for (let key in obj) {
      newObj[`:${key}`] = obj[key]
    }
    return newObj
  }
```
#### A função addAliasDots adiciona dois pontos (:) antes de cada chave de um objeto e retorna o novo objeto. o que é útil para formatar os parâmetros em consultas de banco de dados.

# logo abaixo do nosso codigo anterior vai estar o arquivo `index.ts` adicione a ele:

```ts
export { default as addAliasDots } from "./addAliasDots"
```

##### Esse código exporta a função `addAliasDots` que inserimos antes

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `6.` de novo na pasta `src` você entrará na pasta `services` no arquivo `user.services.ts` e adicionar:

```ts
import { database  } from "../database"

export const findUserByLoginPassword = async (username: string, password: string) => {
  const db = await database()
  return db.get(`SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1`, [username, password])
}

export const getAllUsers = async () => {
  const db = await database()
  return db.all(`SELECT id, name, email, username FROM users`)
}
```

### O código define dois serviços para acessar o banco de dados:
#### `04)` `findUserByLoginPassword`: Encontra um usuário com um nome de usuário e senha específicos.
#### `getAllUsers`: Obtém todos os usuários, retornando informações básicas (id, nome, e-mail e nome de usuário).

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `7.` no arquivo `index.html` da pasta `public` adicione o seguinte código:

````html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gerenciamento dos Tokens</title>
  <link rel="stylesheet" href="index2.css">
  <script defer src="main.js"></script>
</head>

<body>
  <header>
    <h1>Gerenciamento dos Tokens</h1>
    <p>Acompanhe os logs no console do navegador</p>
  </header>
  
  <main>
    <section class="login-section">
      <form>
        <div class="form-group">
          <label for="username">Nome de Usuário:</label>
          <input type="text" id="username" name="username" placeholder="Digite seu nome de usuário" required>
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </section>
    
    <section class="actions-section">
      <button class="get-token">Obter Token</button>
      <button class="get-users">Listar Usuários</button>
      <button class="logout">Sair</button>
    </section>
    
    <section class="output-section">
      <pre>
        ...
      </pre>
    </section>
  </main>
</body>

</html>
````

#### A página HTML permite ao usuário fazer login, obter um token, listar usuários e sair. Ela tem um formulário de login e botões para executar essas ações, com a saída exibida na seção designada pra isso.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `8.` ainda na pasta `public` adicione o seguinte codigo ao seu arquivo `main.js`:

````js
document.addEventListener('DOMContentLoaded', () => {
    const pre = document.querySelector('pre');
    const form = document.querySelector('form');
  
    // Função para exibir dados no elemento <pre>
    const displayResponse = (response, data) => {
      pre.textContent = `${response.status}\n${JSON.stringify(data, null, 2)}`;
    };
  
    // Login
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = form.username.value;
      const password = form.password.value;
  
      try {
        const response = await fetch('/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        displayResponse(response, data);
  
        if (!response.ok) {
          console.error('Falha no login', data);
          alert('Falha no login');
          return;
        }
  
        console.log('Login bem-sucedido', data);
        localStorage.setItem('token', data.token);
        window.location.href = "listagem.html";
      } catch (error) {
        console.error('Erro na requisição de login', error);
        alert('Erro na requisição de login');
      }
    });
  
    // Obter Token
    document.querySelector('button.get-token').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/token/${token}`);
        const data = await response.json();
        displayResponse(response, data);
  
        if (!response.ok) {
          console.error('Falha ao obter token', data);
          alert('Falha ao obter token');
          return;
        }
  
        console.log('Token obtido com sucesso', data);
      } catch (error) {
        console.error('Erro na requisição do token', error);
        alert('Erro na requisição do token');
      }
    });
  
    // Obter Usuários
    document.querySelector('button.get-users').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/users/${token}`);
        const data = await response.json();
        displayResponse(response, data);
  
        if (!response.ok) {
          console.error('Falha ao obter usuários', data);
          alert('Falha ao obter usuários');
          return;
        }
  
        console.log('Usuários obtidos com sucesso', data);
      } catch (error) {
        console.error('Erro na requisição dos usuários', error);
        alert('Erro na requisição dos usuários');
      }
    });
  
    // Logout
    document.querySelector('button.logout').addEventListener('click', async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/token/${token}`, { method: 'DELETE' });
        pre.textContent = response.status;
  
        if (!response.ok) {
          console.error('Falha no logout');
          alert('Falha no logout');
          return;
        }
  
        console.log('Logout realizado com sucesso');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Erro na requisição de logout', error);
        alert('Erro na requisição de logout');
      }
    });
  });

````

### O código realiza as seguintes funções:
#### `01)` Login: Envia uma solicitação de login e, se bem-sucedido, armazena o token no `localStorage` e redireciona para outra página.
#### `02)` Obter Token: Recupera e exibe informações sobre o token armazenado.
#### `03)` Obter Usuários: Lista e exibe todos os usuários.
#### `04)` Logout: Remove o token do `localStorage` e do servidor ao clicar em "Sair".

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `9.` ainda na pasta `public`, adicione o seguinte arquivo `listagem.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">
  <title>Listagem de Usuários</title>
</head>

<body>
  <div class="container">
    <h1>Listagem de Usuários</h1>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dados dos usuários serão carregados aqui -->
      </tbody>
    </table>
  </div>

  <script>
    const tbody = document.querySelector('tbody');

    async function fetchData() {
      const token = localStorage.getItem('token');
      const resp = await fetch('/users/' + token);
      const data = await resp.json();

      tbody.innerHTML = '';

      data.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button class="excluir">Excluir</button>
            <button class="editar">Editar</button>
          </td>
        `;

        const btExcluir = tr.querySelector('button.excluir');
        const btEditar = tr.querySelector('button.editar');

        btExcluir.addEventListener('click', async () => {
          const resp = await fetch(`/users/${user.id}/${token}`, { method: 'DELETE' });
          if (resp.status === 401) {
            alert("Você não tem permissão");
            return;
          }
          tr.remove();
        });

        btEditar.addEventListener('click', async () => {
          const name = prompt('Novo nome:', user.name);
          const email = prompt('Novo email:', user.email);

          const resp = await fetch(`/users/${user.id}/${token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
          });

          if (resp.status === 401) {
            alert("Você não tem permissão");
            return;
          }

          fetchData();
        });

        tbody.appendChild(tr);
      });
    }

    fetchData();
  </script>
</body>

</html>
```
#### Esse código HTML com JavaScript faz o seguinte:

1. **Carrega e Exibe Usuários**: Quando a página é carregada, faz uma requisição para obter uma lista de usuários e exibe esses dados em uma tabela.
2. **Excluir Usuário**: Adiciona um botão "Excluir" para cada usuário, que, ao ser clicado, envia uma solicitação para remover o usuário da lista.
3. **Editar Usuário**: Adiciona um botão "Editar" para cada usuário, que, ao ser clicado, permite alterar o nome e o email do usuário através de prompts e atualiza a lista com as novas informações.

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

# `10.` estamos chegando ao fim. agora nós vamos fazer a parte visual do site.
### no arquivo `index.css` da pasta `public` adicione o seguinte codigo:

```css
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-image: url(https://raw.githubusercontent.com/Edson-Edu/2024-IA22-2TRI/main/public/seattle.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f5f5f5; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  line-height: 1.6;
  transition: background-color 0.3s ease;
}

.container {
  background: rgba(0, 0, 0, 0.75);
  border-radius: 15px; 
  padding: 30px;
  max-width: 800px;
  margin: 50px auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.container:hover {
  transform: scale(1.03); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7); 
}

h1 {
  font-size: 2.8em;
  margin-bottom: 15px;
  color: #e0e0e0; 
  transition: color 0.3s ease;
}

h3 {
  font-size: 1.7em;
  margin-bottom: 25px;
  color: #b0b0b0; 
  transition: color 0.3s ease;
}

form {
  margin-bottom: 20px;
}

form input[type="text"],
form input[type="email"],
form input[type="password"] {
  padding: 12px;
  border: 1px solid #666;
  border-radius: 8px;
  margin: 8px;
  width: calc(50% - 24px);
  background-color: rgba(255, 255, 255, 0.15);
  color: #f5f5f5;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

form input[type="text"]:focus,
form input[type="email"]:focus {
  background-color: rgba(255, 255, 255, 0.25); 
  border-color: #007BFF; 
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); 
}

form button {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  background-color: #007BFF;
  color: #fff;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

form button:hover {
  background-color: #0056b3;
  transform: scale(1.05); 
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}

table th, table td {
  padding: 12px;
  border: 1px solid #555; 
  transition: background-color 0.3s ease, color 0.3s ease;
}

table th {
  background-color: rgba(0, 0, 0, 0.65);
  color: #e0e0e0;
}

table td {
  background-color: rgba(0, 0, 0, 0.55);
}

table button {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 0.95em;
  margin: 3px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

table button.excluir {
  background-color: #dc3545;
}

table button.excluir:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

table button.editar {
  background-color: #28a745; 
}

table button.editar:hover {
  background-color: #218838;
  transform: scale(1.05); 
}
```

#### nada fora da curva, o `CSS` só estiliza a página e deixa agradável...

# agora vá ao arquivo `index2.css` e adicione o seguinte código: 

```css
/* Global Styles */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    background-image: url('https://i.gifer.com/76cI.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #f5f5f5;
    text-align: center;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

/* Header Styles */

header {
    margin-bottom: 30px;
}

h1 {
    color: #ff4d4d;
    font-size: 2.5em;
}

p {
    color: #ff4d4d;
    margin-bottom: 15px;
}

/* Form Styles */

form {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(255, 77, 77, 0.6);
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #ff4d4d;
}

input[type="text"], input[type="password"] {
    padding: 10px;
    border: 1px solid #ff4d4d;
    border-radius: 4px;
    font-size: 14px;
    background-color: #1a1a1a;
    color: #ff4d4d;
}

input[type="text"]:focus, input[type="password"]:focus {
    border-color: #ff4d4d;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 77, 77, 0.2);
}

button[type="submit"] {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #cc0000;
}

/* Button Styles */

.get-token, .get-users, .logout {
    display: inline-block;
    margin-top: 15px;
    margin-right: 10px;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
}

.get-token {
    background-color: #ff4d4d;
}

.get-token:hover {
    background-color: #cc0000;
}

.get-users {
    background-color: #ff4d4d;
}

.get-users:hover {
    background-color: #cc0000;
}

.logout {
    background-color: #ff4d4d;
}

.logout:hover {
    background-color: #cc0000;
}

/* Pre Styles */

pre {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 15px;
    border: 1px solid #ff4d4d;
    border-radius: 5px;
    overflow: auto;
    font-family: 'Courier New', Courier, monospace;
    color: #f5f5f5;
    margin-top: 20px;
    max-width: 100%;
    width: 100%;
}
```