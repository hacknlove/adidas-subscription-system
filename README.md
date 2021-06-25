
# Subscription System

Adidas NodeJs backend challenge - January 2021

System is composed of four microservices:

* public-api: Backend for Frontend microservice to be used by UI frontend
* private-api: Backend for admin microservice to be used by UI admin
* subscription: Microservice imprementing subscription logic, including persistence of subscription data inmongo, and email notification to confirm process is completed.
* mailer: microservice mocking email notifications. 

It uses mongodb for persistance, and kafka for batching emails
## Provided Operations:

* create new subscription
* cancel existing subscription
* get details of a subscription
* get all subscriptions


## Run Locally

Clone the project

```bash
git clone https://github.com/hacknlove/adidas-subscription-system
```

Go to the project directory

```bash
cd adidas-subscription-system
```

Install dependencies

If you have node 14 and yarn you can do
```bash
yarn
```

if not you can do
```bash
docker-compose -f ./docker/dev/docker-compose.yml -p adidas-subscription-dev run subscription yarn
```

Start 

```bash
yarn dev
```

Create authentication tokens

```
yarn getToken admin
```

```
yarn getToken foo@bar.buz
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

To run all unit tests in whatch mode

```bash
  yarn test:ci --watch
```

To run unit test of only one service

```bash
  yarn workspace private-api test --watch
```
