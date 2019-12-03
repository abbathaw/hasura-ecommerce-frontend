import React, { useState, useEffect, useContext } from "react";
import {CognitoAuth} from 'amazon-cognito-auth-js';
import { config as AWSConfig } from 'aws-sdk'
import Loading from './Loading';
import Login from './Login';
import App from '../App';
import { AUTH_CONFIG } from './cognito-variables';


AWSConfig.region = AUTH_CONFIG.region;


const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

export const CognitoContext = React.createContext(null);
export const useCognito = () => useContext(CognitoContext);

export const CognitoProvider = ({
                                  children,
                                  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
                                  ...initOptions
                                }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [cognitoClient, setCognito] = useState();
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState('');
  
  useEffect(() => {
    const initCognito = async () => {
      const cognitoFromHook = await new CognitoAuth(initOptions);
      cognitoFromHook.userhandler = {
        onSuccess: async (result) =>{
          console.log("Success Logging In");
          await handleRedirectCallback(result);
          const userFromCognito = await cognitoFromHook.getCurrentUser();
          setUser(userFromCognito);
        },
        onFailure: (err) => {
          console.error("Error: Failed to login", err);
        }
      };
      
      setCognito(cognitoFromHook);
      const isAuthenticated = await cognitoFromHook.isUserSignedIn();
      
      if (isAuthenticated) {
        const user = await cognitoFromHook.getCurrentUser();
        setUser(user);
        setIsAuthenticated(isAuthenticated);
        const session = await cognitoFromHook.getSignInUserSession();
        setIdToken(session.getIdToken().getJwtToken());
      }
      return cognitoFromHook;
    };
    const curUrl = window.location.href;
    initCognito().then(async (cognito)=> {
      await cognito.parseCognitoWebResponse(curUrl);
      if (!cognito.isUserSignedIn()) {
        setIsAuthenticated(false)
      }
      setLoading(false)
    });
    // eslint-disable-next-line
  }, []);
  
  
  const handleRedirectCallback = async (session) => {
    if (session) {
      const idToken = session.getIdToken();
      setIdToken(idToken.getJwtToken());
    }
    setIsAuthenticated(true);
    return "ok";
  };
  if (loading) {
    return (<Loading />);
  }
  
  if (!isAuthenticated) {
    return (
        <CognitoContext.Provider
            value={{
              isAuthenticated,
              user,
              loading,
              loginWithRedirect: () => cognitoClient.getSession(),
              logout: () =>  cognitoClient.signOut()
            }}
        >
          <Login />);
        </CognitoContext.Provider>
    );
  }
  return (
      isAuthenticated && user ? <CognitoContext.Provider
          value={{
            isAuthenticated,
            idToken,
            user,
            loading,
            loginWithRedirect: () => cognitoClient.getSession(),
            logout: () =>  cognitoClient.signOut()
          }}
      >
        {children}
        <App idToken={idToken} />
      </CognitoContext.Provider> : <Loading/>
  );
};
