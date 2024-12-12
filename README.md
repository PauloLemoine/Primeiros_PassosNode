# Criando Back-end com TypeScript, TypeORM, MySQL para o PI 
<hr>

Ao clonar o repositório deve-se fazer a integração com o banco de dados seguindo os seguintes passos:
1º Criar uma pasta dentro de "src" chamada "config" e criar dentro dela o arquivo "db.config.ts";
2º Colocar as informações dentro dos campos vazios para acessar o banco de dados; 

Exemplo:
export const config = {
    HOST:// O nome do host do banco de dados com o qual se está a conectar,
    PORT:// Qual a porta do banco de dados,
    USER:// O nome do user do banco de dados,
    PASSWORD:// A sua senha para acessar,
    DB:// O nome do banco de dados que será usado,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export const dialect = "mysql";

3º Realizar o "npm i" dentro do Terminal, para instalar as dependencias
