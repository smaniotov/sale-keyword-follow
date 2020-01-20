# sale-keyword-follow

## Table of Contents

- [Overview](#overview)
- [Install](#install)
    - [Additional Notes](#additional-notes)
- [How to run](#how-to-run)
- [Graphql Playground](#graphql-playground)
- [How it works](#how-it-works)

## Overview
`sale-keyword-follow` is a application that consists in create alerts to get ebay sales information periodically in your email.
You are able to create different alerts with different keywords.
You are also able to delete and to update those alerts, in order to stop receiving email or improve your keyword search.
Those alerts can be set to send each 2, 10 or 30 minutes. 

<a id="#install"></a>
## Install

### How to install deps
If you are running locally, you need to install all dependencies manually.

To **install** all the dependencies, you can use `yarn` or `npm`.

```yarn
yarn install
```
```npm
npm install
```

Running either of the above commands will download all the dependencies to node_modules.

<a id="additional-notes"></a>
#### Additional Notes
- If you still don't have the docker installed, to run all the required containers, you will need it, so please install it.

<a id="how-to-run"></a>
## How to run
- Project will always run in port `8080`

### Run with docker
Follow the below instructions to run the project inside a docker container:

- You will need to set all the environment variables. Obs.: For security reasons, we don't set any critical data inside the code.
- Those are the required environment variables that you will need to set:
  - `EMAIL_ADDRESS`: The username that you use in gmail services
  - `EMAIL_PASSWORD`: The username's password
  - `EBAY_CLIENT_ID`: The app id from ebay developer program
  - `EBAY_CLIENT_SECRET`: The client secret from ebay developer program
- `EMAIL_ADDRESS=<email_address> EMAIL_PASSWORD=<email_password> EBAY_CLIENT_ID=<ebay_client_id> EBAY_CLIENT_SECRET=<ebay_client_secret>  docker-compose up -d --build`
  - You can `export` the environment variables before, use the `.env` file, or use `inline` as it's shown above.

This is enough for you run to run the project in docker container.
#### To be easier to use graphql services in browser, the network options from docker-compose is set to 'host', so you can use graphlql by your browser

### Run locally
Follow the below instructions 

- `docker-compose up -d mongo redis`
You can run a command using npm or yarn.

```
yarn: yarn {command}
```

```
npm: npm run {command}
```

- Available run commands:
  - `build`: build project to `/dist` directory
  - `build:prod`: build project with production configurations
  - `start`: run project with hot reload
  - `test`: to run all the tests
  - `tdd`: to run tests with hot reload

<a id='graphql-playground'></a>
## Graphql playground
In order to tests all the possibilities, you can use the graphql api documentation accessing the `/graphql` url.

Feel free to check all the mutations and query options.

Obs.: Remember that project is running in port `8080`, so, to see it in localhost you need to go to `http://localhost:8080/graphql`.

<a id='usage'></a>
### Usage
- Create alert with `delay`, `keyword` and `sendTo` parameters.
  - Remember that you have only those three options for delay: [2, 10, 30]
  - You are not able to create two alert with same keyword and sendTo
- Delete alert when you don't want to receive it anymore.
- Update alert
- Retrieve all alerts or alerts by `sendTo` param.

<a id="#how-it-works"></a>
### How it works
```The logic behind this project is simple, basically we have the API, that is the responsible to handle all CRUD requests.
It was done with `type-graphql`, so it uses the features from typescript and from graphql. 
Besides that, we use a Redis as a Task Queue to store all the messages that need to be processed and to populate Redis,
we use a `cron` lib Cron Job to check in database all alerts that need to be processed in the next 1 minute. Since the alert is added in Redis,
we are able to process it and send the message immediatelly to user.
Obs.: We use redis delay feature to make sure message will be send at the right time.
```
