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
REACT_APP_CLIENT_ID='3kl7hui7a7p7f9tc5qvpn9pupj'
REACT_APP_DOMAIN = 'mazada.auth.us-west-2.amazoncognito.com'
REACT_APP_USER_POOL_ID="us-west-2_9np3c0hBN"
REACT_APP_REGION= "us-west-2"
REACT_APP_HASURA_ENDPOINT="ws://localhost:8080/v1/graphql"
```

Run `npm start` to start the app.
