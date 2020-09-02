
<h1 align="center" style="border-bottom: none;">iTunes Artist Search</h1>
<h3 align="center">Show albums of your favorite artist.</h3>

## Configuring the application

1. In the application folder, copy the *env.example* file and create a file called *.env*

    ```
    itunes$ cp .env.example .env
    ```

## Running locally with React Hot Loader

### Install node dependencies

1. Install the `server` dependencies

    ```
    itunes$ npm install
    ```

2. Install the `client` dependencies

    ```
    itunes/client$ npm install
    ```

### Run the app in developement mode

1. Start the server on port 3001 and client on port 3000

    ```
    itunes$ npm start:dev
    ```

2. View the application in a browser at `localhost:3000`

## Run the app in production

1. Build the React application

    ```
    client$ npm run build
    ```

2. Run the app in production mode

    ```
    itunes$ npm run start
    ```

3. View the application in a browser at `localhost:3000`

    

### Testing
Run unit tests with `npm run test`, then `a` to run all tests. See the output for more info.

```
itunes$ npm run test

Press `a` to run all tests...
```

Test results:
```
 PASS  ...

Test Suites: 3 passed, 3 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        2.934s, estimated 3s
Ran all test suites.
```

## License

  This sample code is licensed under the [MIT](https://opensource.org/licenses/MIT).
