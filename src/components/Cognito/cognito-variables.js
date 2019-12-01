export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_DOMAIN || 'garage2.auth.us-west-2.amazoncognito.com',
  clientId: process.env.REACT_APP_CLIENT_ID || '6lme3ngjku421940qikrioi639',
  responseType: 'token',
  redirectUri: process.env.REACT_APP_BASE_URL  || 'http://localhost:3000',
  signoutUri: process.env.REACT_APP_BASE_URL|| 'http://localhost:3000',
  tokenScopes: [
    "openid",
    "email",
    "profile"
  ],
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || "us-west-2_fkicdDgbj",
  region: process.env.REACT_APP_REGION || "us-west-2",
};
