# Api Tool Repository Manager

Api NodeJs

# Demonstração

# Desenvolvimento

## Instalação do projto

- Download do projeto

`git clone https://github.com/davidfaria/api-tool-repository-manager.git`

_Obs: entre na pasta do projeto para executar os comandos abaixo: `cd api-tool-repository-manager`_

- Instalar dependências

`yarn install`

- Configurando variáveis de ambiente.

_Obs. preencha os valores de acesso ao banco de dados etc..._

`cp .env.example .env`

- Preparar base de dados (docker e docker-compose)

`docker-compose up -d`

`yarn sequelize db:migrate`

- Executar servidor em: http://localhost:3000

`yarn dev`

## Documentação [Swagger](https://swagger.io/)

- Acesse a documentação do projeto em:

[Link documentação api](http://localhost:3000/api-docs)

# Testes

- Editar arquivo .env.test com os dados de teste.

- Criar base de dados de teste

`docker exec -it bx-postgres bash`

`su postgres`

`psql`

`CREATE DATABASE db_test` _Obs. Mesmo nome adicionado no arquivo .env.test_

## Run Testes (Jest)

`yarn test`

## Coverage

- Abrir no navegador **tests**/coverage/index.html
