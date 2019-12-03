import React from 'react';
import jwtDecode from 'jwt-decode';
import {useCognito} from './Cognito/react-cognito-spa';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Page from './Page';
import Loading from './Cognito/Loading';

import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import Items from './Items';
import SingleItem from './SingleItem';
import Stores from './Stores';
import SingleStore from './SingleStore';
import CreateStore from './CreateStore';
import CreateItem from './CreateItem';
import {WebSocketLink} from 'apollo-link-ws';

const createApolloClient = (idToken) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: process.env.REACT_APP_HASURA_ENDPOINT, //change url to ws instead of http when using subscription
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      }
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
                  <Stores />
                </Route>
                <Route path="/item/:id" component={SingleItem} />
                <Route path="/createStore" component={CreateStore} />
                <Route path="/store/:storeId/createItem" component={CreateItem} />
                <Route path="/store/:id" component={SingleStore} />
              </Switch>
            </div>
          </Page>
        </Router>
      </ApolloProvider>
  );
};

export default App;
