export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_DOMAIN,
  clientId: process.env.REACT_APP_CLIENT_ID,
  responseType: 'token',
  redirectUri: process.env.REACT_APP_BASE_URL,
  signoutUri: process.env.REACT_APP_BASE_URL,
  tokenScopes: [
    "openid",
    "email",
    "profile"
  ],
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  region: process.env.REACT_APP_REGION,
};
