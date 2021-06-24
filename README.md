
# Subscription System

Adidas NodeJs backend challenge - January 2021

System is composed of four microservices:

* PublicAPI: Backend for Frontend microservice to be used by UI frontend
* PrivateAPI: Backend for admin microservice to be used by UI admin
* Subscription: Microservice imprementing subscription logic, including persistence of subscription data inmongo, and email notification to confirm process is completed.
* Mailer: microservice mocking email notifications. 

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

  