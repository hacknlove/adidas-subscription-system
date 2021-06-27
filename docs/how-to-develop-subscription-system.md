# How to develop subscription system

If you are a backend developer and you need to fix some bug or add some feature to the subscription system, you are in the right place.

## Run locally

```
git clone git@github.com:hacknlove/adidas-subscription-system.git

cd adidas-subscription-system

yarn

yarn dev
```

## Unit testing

Each workspace has its own unit-tests

you can enter into the workspace and run `yarn test`

for instance

```
cd public-api
yarn test --watch
```

or you can run them from the repo root

for instance
```
yarn workspace public-api test 
```

## Linting

Please, before pushing you should run `yarn lint` from every workspace you have changes in.