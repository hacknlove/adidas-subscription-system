# How to deploy subscription system

If you are a sysadmin or devops and you need to work with the production/staging system of the subscription system, you are in the right place.

Currently this is not a guide with the steps you must follow to deploy, but just the requeriments/description of the system.

An automatic deploy system needs to be included in this repo, and this instructions need to be updated. 

## Services
### public-api

* It needs to be accessible (by https) from internet
* It needs to be able to access:
  * subscription (by http)
  * kafka

### private-api

* it needs to be accessible by https from the adidas private network
* It needs to be able to access:
  * subscription (by http)
  * kafka

### subscription
* it must be not accesible from internet
* it needs to be accesible by:
  * public-api
  * private-api
* it needs to access mongo

### mailer
* it must be not accesible.
* it needs to access kafka

## Environmental Variables:

### public-api
* `JWT_SECRET` shared secret to sign json web tokens
* `SUBSCRIPTION_URL` url to access the subscription service https://foo.bar
### private-api
* `JWT_SECRET` shared secret to sign json web tokens
* `SUBSCRIPTION_URL` url to access the subscription service https://foo.bar
### subscription
### mailer
* `KAFKA_URL` to connect with kafka
