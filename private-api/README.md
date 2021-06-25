
# Private Api

This exposes endpoints for the private operations, meaning operations that are meant to be done by adidas' admins.

## API documentation
[API](./API.md)


## Installation 

Install with yarn from the workspaces root folder

```bash 
  yarn
```
    
## Running Tests

### From this folder
```bash
  yarn test
```

### From the worspaces root folder 

```bash
  yarn workspace private-api test
```

## Generating the docs 

Install with yarn from the workspaces root folder

### From this folder
```bash
  yarn apidoc
```

### From the worspaces root folder 

```bash
  yarn workspace private-api apidoc
```


## Environment Variables

`SUBSCRIPTION_URL` where to find the subscription service

`JWT_SECRET` the secret used to sign the json web tokens

Here you can change the default values used by docked-compose in the [development environment](../docker/dev/.env) and the [E2E test environment](../docker/test/.env)

You can also set temporary values prepending them to the command

```
JWT_SECRET=other_secret SUBSCRIPTION_URL=https://foo.com yarn dev
```


## Documentation

This service is just a small and simple layer that verifies the authorizations, validates/sanitizes the inputs, and pipes the request to the right internal service and endpoint.

The endpoints' paths match the files' paths.

The controllers can exports either a tipical express middleware (`(req, res, next) => {}`) or an array of those.

Every controller holds full responsability, the generalization is done through importing middlewares and factories and adding them to the exported array.

Inputs are verified using JsonSchema, which lives also on the controller, but common schemas can and should be shared and imported.

These are the reasons for this architecture:

1. It makes it simpler and quicker to find the right controller for any endpoint.
2. It does not hide anything, so the developer always knows what's going on.
3. It's serverless ready. If we want to go serverless it would be very easy.


