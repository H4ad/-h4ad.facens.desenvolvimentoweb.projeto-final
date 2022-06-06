<h1 align="center">
    <img alt="Be The Hero" src="../github/assets/logo.svg" width="400px" />
</h1>

<h4 align="center">
  🚀 Desenvolvimento Web
</h4>

<p align="center">
  <a href="#book-introducao">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-rodar">Introdução</a>
</p>

## :book: Introdução

Essa será a implementação do backend em Express e MongoDB.

## :rocket: Como rodar

Para rodar, você precisa ter instalado o Node 14.

Depois disso, rode o comando:

```bash
npm i
```

E depois, crie o arquivo com as variáveis de ambiente, rode o comando:

```
cp .env.example .env
```

E dentro desse arquivo, coloque a variável para se conectar com o banco de dados, caso não saiba como obter, [clique aqui](https://www.mongodb.com/atlas/database).

No final, ele deve ficar assim:

```
PORT=3010
TYPEORM_URL=mongodb+srv://root:<password>@<host>.mongodb.net/?retryWrites=true&w=majority
```

E por fim, inicie com o comando:

```
npm run start
```
