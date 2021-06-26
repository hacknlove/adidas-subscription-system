
# subscription

This exposes endpoints for internal operations, meaning operations that are requested by another service.

Inputs are not validated or sanitized because that responsability lies on the services that talk with the exterior.

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
  yarn workspace subscription test
```

## Generating the docs 

Install with yarn from the workspaces root folder

### From this folder
```bash
  yarn apidoc
```

### From the worspaces root folder 

```bash
  yarn workspace subscription apidoc
```

## Environment Variables

`KAFKA_URL` Where to find kafka

`JWT_SECRET` the secret used to sign the json web tokens
