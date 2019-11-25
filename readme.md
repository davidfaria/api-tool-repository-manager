# Api Tool Repository Manager

Api NodeJs

# Demonostração

# Desenvolvimento

## Instalação do projto

- Download do projeto

`git clone https://github.com/davidfaria/api-tool-repository-manager.git`

- Instalar dependências

`yarn install`

- Preparar base de dados (docker e docker-compose)

`docker-compose up -d`

`yarn sequelize db:migrate`

- Executar servidor em: http://localhost:3000

`yarn dev`

## Documentação [Swagger](https://swagger.io/)

- Acesse a documentação do projeto em:

[Link documentação api](http://localhost:3000/api-docs)

# Testes

## Run Testes (Jest)

`yarn test`

## Coverage

- Abrir no navegador **tests**/coverage/index.html
