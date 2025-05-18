Transactions Service project with both backend and frontend project included for easier approach

# Frontend

Run `npm i` to install all dependencies.

Create .env out of .env.example for backend base api configuration.

Then, run the development server:

```bash
npm run dev
```

If your use port 3000 then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Backend

## Project setup

```bash
$ npm install
```

## DB Setup

1. Use .env.example and create your own .env for DB credentials setup
2. Run `npm run migration:run` for migrations to run and create `transactions` table

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
