# API assignment - Adcash Backend Internship

---
By Dachi Mshvidobadze

## How to run

First, to install all the dependencies, run

`
npm install
`

Project also needs a working connection to a mongoDB database.\
To run a mongoDB in docker, first download the working mongoDB image
`sudo docker pull mongo:4.4`\
After that, run\
```sudo docker run -d -p 27017-27019:27017-27019 --name mongoDB_New mongo:4.4```

The above command will run the container in detached mode, i.e. in the background.
We are also mapping the container ports with host ports so that we can access the database
from this application.\
The ports used were taken from the MongoDB documentation.

---

After that, there are several commands you can run:

* `npm start` - will run the application.

* `npm run test` - will run all tests from the `./tests/` folder.

* `CI=true npm test -- --coverage` - will generate a basic test coverage report
in `./coverage/lcov-report/index.html` file.

* `npm run dev` - will run the application in 'developer' mode,
instantly refreshing when changes are made in the editor.
