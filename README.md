# workout-tracker


# How to run?
First clone the application,
```
$ git clone https://github.com/ananthvk/workout-tracker
$ cd workout-tracker
```

## To run the application

```
$ docker compose up
```

View the application at [http://localhost:3000](http://localhost:3000)

View the docs at [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)


## To run the tests

```
$ docker compose up -d db
$ pnpm test
```

## List of routes
```
├── /docs (GET, HEAD)
│   └── / (GET, HEAD)
│       ├── static/index.html (GET, HEAD)
│       ├── static/swagger-initializer.js (GET, HEAD)
│       ├── * (HEAD, GET)
│       ├── json (GET, HEAD)
│       └── yaml (GET, HEAD)
├── /user (GET, HEAD)
│   └── s (POST)
├── /token (POST)
├── /exercise/:id (GET, HEAD)
├── /exercises (GET, HEAD, POST)
├── /category/muscles (GET, HEAD, POST)
├── /category/types (GET, HEAD, POST)
├── /session/:session_id (GET, HEAD)
│   └── /sets (GET, HEAD, POST)
└── /sessions (POST)
```

## Coverage report

```
 PASS  test/routes/api/v1/categories.test.ts 18 OK 12s
 PASS  test/routes/api/v1/index.test.ts 1 OK 13s
 PASS  test/routes/root.test.ts 2 OK 13s
 PASS  test/routes/api/v1/exercise.test.ts 27 OK 14s
 PASS  test/routes/api/v1/workoutsession.test.ts 22 OK 16s
 PASS  test/routes/api/v1/user.test.ts 42 OK 17s
 ```

--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |     100 |      100 |     100 |     100 |                  
 src                |     100 |      100 |     100 |     100 |                  
  app.ts            |     100 |      100 |     100 |     100 |                  
 src/models         |     100 |      100 |     100 |     100 |                  
  categories.ts     |     100 |      100 |     100 |     100 |                  
  exercise.ts       |     100 |      100 |     100 |     100 |                  
  user.ts           |     100 |      100 |     100 |     100 |                  
  utils.ts          |     100 |      100 |     100 |     100 |                  
  workoutsession.ts |     100 |      100 |     100 |     100 |                  
 src/plugins        |     100 |      100 |     100 |     100 |                  
  auth.ts           |     100 |      100 |     100 |     100 |                  
  errorhandler.ts   |     100 |      100 |     100 |     100 |                  
  postgres.ts       |     100 |      100 |     100 |     100 |                  
  sensible.ts       |     100 |      100 |     100 |     100 |                  
  support.ts        |     100 |      100 |     100 |     100 |                  
 src/routes         |     100 |      100 |     100 |     100 |                  
  root.ts           |     100 |      100 |     100 |     100 |                  
 src/routes/api/v1  |     100 |      100 |     100 |     100 |                  
  categories.ts     |     100 |      100 |     100 |     100 |                  
  exercise.ts       |     100 |      100 |     100 |     100 |                  
  index.ts          |     100 |      100 |     100 |     100 |                  
  user.ts           |     100 |      100 |     100 |     100 |                  
  workoutsession.ts |     100 |      100 |     100 |     100 |                  
 src/schemas        |     100 |      100 |     100 |     100 |                  
  categories.ts     |     100 |      100 |     100 |     100 |                  
  exercise.ts       |     100 |      100 |     100 |     100 |                  
  user.ts           |     100 |      100 |     100 |     100 |                  
  workoutsession.ts |     100 |      100 |     100 |     100 |                  
--------------------|---------|----------|---------|---------|-------------------

                       
```
  🌈 TEST COMPLETE 🌈  
                       

Asserts:  112 pass  0 fail  112 of 112 complete
Suites:     6 pass  0 fail      6 of 6 complete

# { total: 112, pass: 112 }
# time=17087.129ms
```
