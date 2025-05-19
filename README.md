# load-testing-pdt

Project to get to grips with load testing

## Description

Simple RESTful api that has two endpoints

- `/normal` returns a 200 response immediately
- `/laggy` returns a 200 response after a random delay between 0-220 milliseconds

Contains load testing scripts to assert performance of the application

## How-to

Step 1: Build and run the API in docker
`docker-compose up --build -d`
This runs it in detached mode so you can continue to run the other scripts in the project

Step 2: Install k6
`brew install k6`

Step 3: Run k6
`k6 run loadtest.js`
or
`k6 run loadtest2.js`  