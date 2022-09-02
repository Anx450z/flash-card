# Issue with cross site cookies

`https://stackoverflow.com/questions/71025703/not-able-to-set-receive-cookies-cross-domain-using-netlify-and-heroku`

## flash-card

## Introduction

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

## dev dependencies

- nodemon
- prettier
- ts-node
- typescript
- tsc
- @types
- faker {@faker-js/faker --dev}

## TypeORM

## Generate migration example

- yarn typeorm migration:generate ./src/migration/add-user --dataSource ./src/data-source.ts

## Run the migration

- yarn typeorm migration:run --dataSource ./src/data-source.ts

## revert the migration

- yarn typeorm migration:revert --dataSource ./src/data-source.ts
