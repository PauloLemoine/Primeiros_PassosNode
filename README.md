# Criando Back-end com TypeScript, TypeORM, MySQL para o PI 

Ao clonar o repositório deve-se fazer a integração com o banco de dados seguindo os seguintes passos:
<br>1º Criar uma pasta dentro de "src" chamada "config" e criar dentro dela o arquivo "db.config.ts";
<br>2º Colocar as informações dentro dos campos vazios para acessar o banco de dados; 

<br>Exemplo:
<br>export const config = {
<br>    HOST:// O nome do host do banco de dados com o qual se está a conectar,
<br>    PORT:// Qual a porta do banco de dados,
<br>    USER:// O nome do user do banco de dados,
<br>    PASSWORD:// A sua senha para acessar,
<br>    DB:// O nome do banco de dados que será usado,
<br>    pool:{
<br>        max: 5,
<br>        min: 0,
<br>        acquire: 30000,
<br>        idle: 10000
<br>    }
<br>};

<br>export const dialect = "mysql";

<br>3º Realizar o "npm install" dentro do Terminal, para instalar as dependencias.
