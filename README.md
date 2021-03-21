# API assignment - Adcash Backend Internship

By Dachi Mshvidobadze

## Pre-Setup

Make sure ports 3001(for the API) and 27017(for the database) are free.\
This project also requires [docker](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/).

## Setting up the project

First, to install all the dependencies, run:

`
npm install
`

Project also needs a working connection to a mongoDB database.\
You can do so, by running the following command in the root direcotry of the project:

`sudo docker-compose -f mongo-docker-compose.yaml up`

This runs docker with [mongoDB](https://www.mongodb.com/) version 4.4, and maps port 27017 of the container to the host.
The port number is taken from mongo [documentation](https://docs.mongodb.com/manual/reference/default-mongodb-port/)\
If everything runs successfully, then the database is pretty much ready.

## Running the project

After that, there are several commands you can run:

* `npm start` - to run the application.

* `npm run test` - to run all tests from the `./tests/` folder.

* `npm run coverage` - to generate a basic test coverage report
in `./coverage/lcov-report/index.html` file.

* `npm run dev` - to run the application in 'developer' mode,
instantly refreshing when changes are made in the editor.
  
## Using the project

Along with the project, Swagger-UI will also launch.

http://localhost:3001/api-documentation

It includes all the endpoints and usage - as is customary for a documentation.
