import ReactDOM from "react-dom";
import React from "react";
import { Route, Router } from "react-router-dom";

import "./styles/App.css";

import history from "./utils/history";
import { AUTH_CONFIG } from './components/Cognito/cognito-variables';
import {CognitoProvider} from "./components/Cognito/react-cognito-spa";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const mainRoutes = (
  <Router history={history}>
    <Route
      path="/"
      render={props => (
        <CognitoProvider
            AppWebDomain={AUTH_CONFIG.domain}
            ClientId={AUTH_CONFIG.clientId}
            UserPoolId={AUTH_CONFIG.UserPoolId}
            RedirectUriSignIn={AUTH_CONFIG.redirectUri}
            TokenScopesArray={AUTH_CONFIG.tokenScopes}
            RedirectUriSignOut={AUTH_CONFIG.signoutUri}
            onRedirectCallback={onRedirectCallback}
        />
      )}
    />
  </Router>
);

ReactDOM.render(mainRoutes, document.getElementById("root"));
