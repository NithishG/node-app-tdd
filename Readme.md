## Prerequisites
    - Node (Expressjs)
    - Body Parser
    - MongoDB
    - Jasmine
    - Proxyquire
    - supertest

## Installing Dependencies
In this app we are going to use nodejs with
- `express` framework 
-  `mongoose` which help us to connect to our repository MongoDB. 
- `body-parser` to get the body data from the request.
- `Jasmine` used for writing and executing the unit tests. 
- `Proxyquire` used for providing the stubs for dependencies while writing unit tests for a particular module.
- `supertest` allows us to make requests against an express object

## Project Setup
Before starting the development, we have to first setup the app structure. Below is the structure that will be used for this app
- app
    - config
    - routes
    - handlers (or) controllers
    - models
- spec
- server.js
- package.json

### config
All the configuration goes here.

### routes
Application routes are defined here and only the request and response handling will be there.

### handlers (or) controllers
Application Business logic will be defined under this.

### models
All the models required by the application will be defined here.

## Routes
Define the end points which will be consumed by the client

## Defining Model Schema
Define various models and schemas required for the application using `mongoose`. 
Defining schema is important as this will help our app to map data from MongoDB to json objects


## Writing Unit tests
We have defined what each component in the app what it does. So based on this we have to write the test cases for each component.

For eg. controllers will have business logic, so we should write the tests for each and every controller separately with the expected behavior what it should do. If the controller depend on model, then we have to mock that or use spy in order to test the conroller alone.

## Writing the App logic
As we have already defined our tests, so our application logic should be in such a way that it should pass all the tests. If any of the test are failing then we have to refactor the code until all the tests pass. 