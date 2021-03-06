# How to use subscription public api

If you are a frontend/fullstack developer and you need to allow your users to create subscription you are in the right place.

## With javascript SDK

This sdk is isomorphic, you can use from the serverside and from the clientside

It relies on having the global fetch, so when used from serverside you need to make fetch to be available as a global

### installation
```bash
yarn add @adidas-subscription/public-api
```

```bash
npm i @adidas-subscription/public-api
```

### Environmental Variables
For local environment
```
SUBSCRIPTION_PUBLIC_API_URL=http://localhost:8000
```

For some staging environment (you need to be on the VPN)
```
SUBSCRIPTION_PUBLIC_API_URL=https://public.subscription.staging.adidas.com
```

For production
```
SUBSCRIPTION_PUBLIC_API_URL=https://public.subscription.adidas.com
```

### Run local environment

```
git clone git@github.com:hacknlove/adidas-subscription-system.git
cd adidas-subscription-system

yarn

yarn dev
```

### Examples

#### An user wants to subscribe

You have a form to subscribe to some campain (`newsletterId`), the user enters its email, checks its consentment to receive emails and submit the form.

You need to call `subscribeToNewsletter` to send a verification email generated with some template `templateId` and params `templateParams`

`templateParams` will have an extra param `token` that needs to be used by the confirmation link (for instance `https://yoursite.com/confirm?campain=newsletterid&email=email&token=token`)


* If the user is already subscribed to that campain, you'll get `{ exists: true }`
* If something went wrong you'll get `{ error: what-ever-error }`
* If the email was queued to be sent, you'll get ` sent: true }`

```js
import subscribeToNewsletter from '@adidas-subscription/public-api/subscribeToNewsletter';
import fetch from 'node-fetch';

global.fetch = fetch;

async function main() {
  const data = await subscribeToNewsletter({
    email: 'foo@bar.com',
    newsletterId: '012345678012345678012345678', // mongo ObjectId hexadecimal representation
    consent: true,
    templateId: '012345678012345678012345678', // mongo ObjectId hexadecimal representation 
    templateParams: {

    } //whatever the template requires
  })

  if (data.error) {
    //
  }

  if (data.exists) {

  }

  if (data.sent) {
    //
  }
}
```

#### verify a subscription

The user has followed the verification email link, he has arrived to your site where you have shown him a form where he must enter

* `birthDate` (whatever string that you can use with `new Date(birthDate)`)
* `[firstName]` 
* `[gender]` any of these: 
    * `"M"` meaning male
    * `"F"` meaning female
    * `"X"` meaning other

When the user submit the form you call `verifySubscription` and you'll get the subscription id

```js
import verifySubscription from '@adidas-subscription/public-api/verifySubscription';

async function main() {
  const data = await verifySubscription({
    email: 'foo@bar.com',
    newsletterId: '012345678012345678012345678'// mongo ObjectId hexadecimal representation,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmb29AYmFyLmJ1eiIsImV4cGlyZXNJbiI6IjFkIiwiaXNzIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiaWF0IjoxNjI0NzMyNjY4fQ.NegUPQHE3Jom0AR_j52u6cvfyIf3C_XIEwNVfEr8czQ' // JWT
  })

  if (data.error) {
    //
  }

  if (data.subscriptionId) {
    //
  }
}

```

Cancel a subscription 

Every email send in a campaing includes a cancelation link, that is generated by some template using the parameter `cancelToken`

This link will send the user to your site where you will ask the user to confirm the cancelation. You might want to prompt for the reason (not interested, too many emails, etc) 

If the users confirms the cancelation you need to call `cancelSubscription` and you will get `{ ok: true }`

```js
import cancelSubscription from '@adidas-subscription/public-api/cancelSubscription';

async function main() {
  const data = await cancelSubscription({
    email: 'foo@bar.com',
    newsletterId: '012345678012345678012345678'// mongo ObjectId hexadecimal representation,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmb29AYmFyLmJ1eiIsImV4cGlyZXNJbiI6IjFkIiwiaXNzIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiaWF0IjoxNjI0NzMyNjY4fQ.NegUPQHE3Jom0AR_j52u6cvfyIf3C_XIEwNVfEr8czQ' // JWT
  })

  if (data.error) {
    //
  }

  if (data.ok) {
    //
  }
}
```

## With REST

public-service is open to internet and has cors settings so you can use it from the client side

* [public api REST reference](./public-api-rest-reference.md)