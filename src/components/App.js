import React from 'react';
import jwtDecode from 'jwt-decode';
import {useCognito} from './Cognito/react-cognito-spa';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Page from './Page';
import Loading from './Cognito/Loading';

import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import Items from './Items';
import CreateItem from './CreateItem';

const createApolloClient = (idToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_HASURA_ENDPOINT,
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const App = ({idToken}) => {
  console.log("ID TOKEN", `Bearer ${idToken}`);
  const {loading} = useCognito();
  const decodedJwt = jwtDecode(idToken);
  const client = createApolloClient(idToken);
  console.log('decodedJWT', decodedJwt);
  if ( loading ) {
    return <Loading/>;
  }
  return (
      <ApolloProvider client={client}>
        <Router>
          <Page>
            <div>
              <Switch>
                <Route exact path="/">
                  <Items/>
                </Route>
                <Route path="/shop">
                  <Items />
                </Route>
                <Route path="/Sell">
                  <CreateItem />
                </Route>
              </Switch>
            </div>
          </Page>
        </Router>
      </ApolloProvider>
  );
};

export default App;
