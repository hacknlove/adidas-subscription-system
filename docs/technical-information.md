# Technical information

## Monorepo - workspaces

The system uses yarn workspaces to make it easier to share code, and to avoid version conflicts.

## Docker compose

Docker compose is used to run the local environment.

## Framework

public-api private-api and subscription use expressjs, but instead of having a monolitic routes.js to map paths and controllers, it spins up the endpoints dynamically at startup time.

### Main reasons being:

* to make it easier for newcommers to browse to the code, and to find quickly the controller for any endpoint.
* to make it declarative instead of imperative.
* to avoid git conflicts on routes.js, shared and touched by everybody very often.
* to make it serverless ready. (it would take a couple of tweaks to deploy every endpoint as a serverless function).
* to increase legibility and maintainability.

## SDK

Every REST service includes a folder with a js sdk.

### Main reasons being:
* to help developers to use the service.
* to keep better code consistence between all the projects that use the service.
* to serve as another source of examples and documentation.
* to abstract REST implementation details from developers, and allow IDE code autocompletion and suggestions.
* to help the projects using the service to be more reliable against changes on the service.

## API documentation

Api documentation is generated with apidoc and apidoc-markdown, so it can be viewed from the repo web

## Native node 14 with ES Modules

The project is not using any transpiler, because I wanted to keep more control about what is actually being executed.

I use to do this on server side projects where we can trust the environment characteristics.

node support for ECMAScript Modules is not experimental since node 14, so there is less and less need for using babel in serverside projects, and I tried to use this project to test how far you can go with ESM and without transpiling. 

But in the downside, not transpiling implies not using typescript.
In the upside, this force us to care for having great automatic testing, as we cannot rely on static type checking.
