<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 
## Description

Backend code developed using the NestJS framework to manage basic authentication.

### Features
- JWT Authentication with Passport
- Input field validation
- TypeORM + MongoDB
- Custom Environment configurations
- Detailed Logging
- Data sanitization
- Request Throttling
- CORS Whitelisting


## Installation

```bash
$ npm install
```

### Database setup

The app requires a MongoDB service to be running on port `27017`.
If you have any configuration settings for the MongoDB service, please update the `.env.development` file.

## Running the app

```bash
# Windows(development)
$ npm run start

# Unix(development)
$ npm run start:unix
```

