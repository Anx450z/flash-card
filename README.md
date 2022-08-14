# flash-card

# Introduction
 this project aim to create a simple web app that can show flash cards.
 different users can sign up and use the flash cards
 

## requirements
- typeORM
- class-validator
- dotenv
- express-session
- express
- passport
- pg
- bcrypt
- nodemailer
- cors
- passport-google-oauth20
- passport-twitter
- passport-github
- axios

## dev dependencies
- nodemon
- prettier
- ts-node
- typescript
- tsc
- @types/* 

# TypeORM

## Generate migration example 
- yarn typeorm migration:generate ./src/migration/add-user --dataSource ./src/data-source.ts
## Run the migration
- yarn typeorm migration:run --dataSource ./src/data-source.ts

## revert the migration
- yarn typeorm migration:revert --dataSource ./src/data-source.ts