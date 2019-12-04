Mazada
--------


Tech stack
----------

-Auth: Aws cognito
- Frontend
    - React v16.8

Run the React app
-----------------

env
```sbtshell
REACT_APP_BASE_URL="http://localhost:3000"
REACT_APP_CLIENT_ID=<Cognito Client ID>
REACT_APP_DOMAIN =<Cognito Hosted UI Domain ID>
REACT_APP_USER_POOL_ID=<Cognito USER POOL ID>
REACT_APP_REGION= "us-west-2"
REACT_APP_HASURA_ENDPOINT="ws://localhost:8080/v1/graphql"
```

Run `npm start` to start the app.
