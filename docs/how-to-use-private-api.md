# How to use subscription private api

If you are a frontend/fullstack developer and you are working in some admin UI for the subscription system, you are in the right place.

## With javascript SDK

This sdk is server-side only, because it requires server-side secrets to sign the requests.


### installation
```bash
yarn add @adidas-subscription/private-api
```

```bash
npm i @adidas-subscription/private-api
```

### Environmental Variables
For local environment
```
SUBSCRIPTION_PRIVATE_API_URL=http://localhost:8001
JWT_SECRET=dev_jwt_secret
```

For some staging environment (you need to be on the VPN)
```
SUBSCRIPTION_PRIVATE_API_URL=https://public.subscription.staging.adidas.com
JWT_SECRET=staging_jwt_secret
```

For production
```
SUBSCRIPTION_PRIVATE_API_URL=https://public.subscription.adidas.com
JWT_SECRET=??
```

### Run local environment

```
git clone git@github.com:hacknlove/adidas-subscription-system.git
cd adidas-subscription-system

yarn

yarn dev
```

### Examples

#### get an array with all subscriptions

```js
import getAll from '@adidas-subscription/private-api/getAll';

async function main() {
  const data = await getAll()

  if (data.error) {
    //
  }

  for(const subscription of data) {

  }
}
```

#### Get the subscription of an expecific campain

```js
import getNewsletterSubscriptions from '@adidas-subscription/private-api/getNewsletterSubscriptions';

async function main() {
  const data = await getNewsletterSubscriptions({
    newsletterId: '012345678012345678012345678'// mongo ObjectId hexadecimal representation,
  })

  if (data.error) {
    //
  }

  if (data.subscriptionId) {
    //
  }
}

```

#### Get the details of a subscription 

```js
import getSubscription from '@adidas-subscription/private-api/getSubscription';

async function main() {
  const subscription = await getSubscription({
    email: 'foo@bar.com',
    newsletterId: '012345678012345678012345678'// mongo ObjectId hexadecimal representation,
  })

  if (subscription.error) {
    //
  }

  // subscription
}
```

## With REST

private-service is only accesible from inside the internal private network, thus you can only use it from the server side

* [private api REST reference](./private-api-rest-reference.md)