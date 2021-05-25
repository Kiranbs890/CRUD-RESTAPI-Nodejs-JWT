## Simple CRUD REST API with Express.js
Simple REST API CRUD (Create,Read,Update,Delete) on Nodejs using framework Express JS featuring Sequelize ORM with database MySQL.

Project includes
- Redis cache implementation for list API
- Socket for notifications on CRUD.
- Unit test cases for CRUD on JEST.

Postman Collection documentation : https://documenter.getpostman.com/view/8141150/TzXunKZd

### 1) Install sequelize-cli --globall 
`npm i sequelize-cli -g`

### 4) Install Package local
`npm i`

### 5) Config database
change username and password and database_name (if you want). on .env file

### 6) Creating Database
`sequelize db:create`

### 7) Migrations
`sequelize db:migrate`

### 8) Seeders (if you need dummy data)
`sequelize db:seed:all`

### 9) Running project (Development)
`npm run dev`

### 10) Running project test case (Development)
`npm run test`

You can access via http://localhost:5000/


