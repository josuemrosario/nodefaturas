# Sistema Faturas

nodefaturas é um sistema desenvolvido em aula para aprender a usar o node com o Express

## Tecnologias Utilizadas

- Model View Controller
- node
- expressJS 
- MongoDB (Banco de Dados)
- Compass (Cliente do mongoDB usado para observar os dados que foram inseridos)
- Mongoose (Acessar o MongoDB usando schemas parecidos semelhantes DB Relacional )
- Tailwind e Daisyui (front-end)
- postcss / postcss-cli
- bcrypt (encriptação de dados) 
- nodemon
- Connect-flash (envio de informações do back para o front)
- dotenv (configuração de variáveis de ambiente do sistema)
- ejs (tratamento de views)
- express-session ( controle de sessão)
- Morgan (configuração de logs)

## Ambiente em que foi desenvolvido
  
- Sistema Operacional Windows
- Vscode usando a extensão Prettier

## Instalação

1 - Instalar o mongodb na maquina caso for utilizar banco localmente
2 - Criar o arquivo .env (Basta renomeiar o arquivo .env_exemplo para .env e completar as configurações necessárias)
3 - instale todas as dependencias

```sh
npm i
```
4 - compile o CSS 

```sh
npm run devcss
```
4 - Suba a instância do mongodb
O bat abrir_mongo.bat sobe a instancia do mongoDb. 
É necessário atualizar o caminho do mongodb.exe dentro do arquivo bat antes de rodar

```sh
.\abrir_mongo.bat  
```
5 - suba o servidor

```sh
npm run dev
```

## Erros conhecidos

Erro:  Ao tentar rodar a instancia do  mongodb pelo arquivo abrir.bat o arquivo mongod.exe não é encontrado ou a instancia não fica ativa
solução:
Observe se o caminho que esta sendo chamado dentro de abrir_mongo.bat corresponde a versao instalada no computador. Em caso negativo edite o caminho antes de rodar o bat.

## Livro de Referência

node.js Web Development for Beginners
A Step-By-Steo Guide to Build an MVC Web Application With Node.js, Express and MongoDB