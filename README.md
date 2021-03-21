# API assignment - Adcash Backend Internship

By Dachi Mshvidobadze

## Pre-Setup

Make sure ports 3001(for the API) and 27017(for the database) are free

## Setting it up

First, to install all the dependencies, run

`
npm install
`

Project also needs a working connection to a mongoDB database.

To run a mongoDB instance in a docker container, first download the working mongoDB image:\
`sudo docker pull mongo:4.4`\
Then:\
```sudo docker run -d -p 27017:27017 --name mongoDB_New mongo:4.4```

The above command will run the container in detached mode, i.e. in the background.
This also maps the container ports to host ports so that the database can be accessed
from the application.\
The port used are taken from the MongoDB documentation.

## Running it

After that, there are several commands you can run:

* `npm start` - will run the application.

* `npm run test` - will run all tests from the `./tests/` folder.

* `CI=true npm test -- --coverage` - will generate a basic test coverage report
in `./coverage/lcov-report/index.html` file.

* `npm run dev` - will run the application in 'developer' mode,
instantly refreshing when changes are made in the editor.
  
## Using it

After the project is launched, Swagger documentation will be available at 

http://localhost:3001/api-documentation

It includes all the endpoints and usage - as is customary for a documentation
