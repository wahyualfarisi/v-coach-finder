# Coach Finder
## _Vue Project practice_

Coach finder is a app that can use to find any teacher in web development, you can filter coach in spesific field, try to contact her/she if you want, and also you can become a coach in this application by registering you profile and after that you can received any message from your student.

## Features
- Login
- Register as coach
- Fetch coaches list
- See coaches details
- Receive message
- Send message to coach

## Try it

See  [Demo](https://nodejs.org/).

## Run in development mode

Coach Finder requires [Node.js](https://vue-coach-finder-e4861.web.app/) v10+ to run.

Install the dependencies and devDependencies and start the server.
## 1. Register firebase config
- Login to firebase console
- Enable auhtentication
- Enable Realtime Database

## 2. Create .env file 
- VUE_APP_TOKEN=<yourtoken>
- VUE_APP_API_URL=<yourfirebasedatabaseurl>

## 3. Run
```sh
npm i
npn run serve
```