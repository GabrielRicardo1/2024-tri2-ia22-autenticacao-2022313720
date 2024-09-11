##### 2024-IA22-2TRI
# *iniciando o tutorial* 👍

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://media.giphy.com/media/YtCAXWS94FZbWiKmKH/giphy.gif?cid=ecf05e47oncgcuvvpoeulkadb6geg0jqwa4z76tr4fxzez00&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
</div>


###### (em alguns momentos vou parecer repetitivo e falar coisas óbvias, basicamente pq esse tutorial foi feito pra qualquer tongão fazer.) `AVISO` o codespace as vezes é meio lento, então não se assuste se as coisas não funcionarem imediatamente

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

# `1.`iniciando o nosso projeto:
### abra o terminal (ctrl + ' ) e execute os comandos abaixo. talvez apareça uma mensagem de erro/atenção mas não se preocupe, pode executar tudo de uma vez! 

```
npm init -y
npm install express sqlite3 sqlite
npm install --save-dev typescript nodemon ts-node @types/express
npx tsc --init

mkdir public
touch public/index.html
touch public/main.css
touch public/main.js

mkdir src
touch src/index.ts
touch src/database.ts

git init
touch .gitignore
```

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

### como esse tutorial é focado em combinar os conceitos de autenticação e CRUD, me abstenho de refazer tudo do zero. você vai precisar fazer meu tutorial anterior e quando concluir pode voltar aqui para darmos continuidade

# faça o tutorial 1 aqui: [TUTORIAL](git@github.com:GabrielRicardo1/2024-IA22-2TRI.git)

<div style="display: inline_block"><br/>
   <img align="center" alt="C" src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" />
</div>

### pronto, podemos começar. (sacabagem, a maior parte já foi.)