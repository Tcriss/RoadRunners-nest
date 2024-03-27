## RoadRunners-API fork

This is a fork from the original api made by [HaroldMart](https://github.com/HaroldMart/RoadRunners-Backend). I rebuilt the original api in NestJS, taking advantages of its structure & organizations.

## Dependencies

- nestjs/express
- dotenv
- typeOrm
- morgan
- multer
- cors
- passport jwt
- axios
- class-validator
- class-transformer
- cloudinary
- jwks-rsa
- mongodb

## Installation

```bash
$ npm install
```

## Building with docker

```bash
$ docker compose up --build -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```