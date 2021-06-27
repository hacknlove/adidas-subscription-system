# How to QA subscription-system

If you are a Quality Assurance Developer and you want to ensure subscription system works as expected, you are in the right place.

## Manual API testing

The file [e2e/hoppscotch.json](../e2e/hoppscotch) can be imported in https://hoppscotch.io/ and be used as a starting point to make manual api testing.

## API REST documentation

* [public-api](./public-api-rest-reference.md)
* [private-api](./private-api-rest-reference.md)

## Run locally

```
git clone git@github.com:hacknlove/adidas-subscription-system.git

cd adidas-subscription-system

yarn

yarn dev
```

## Generate token
From the root of the repo, run


```
yarn getToken some@email.com some-newsletterId 
```

For those endpoints without email, use `admin`

For those endpoints without newsleterId use `none`



## Automatic API testing

```
yarn test
```

WIP