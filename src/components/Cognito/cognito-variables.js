export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_DOMAIN || 'mazada.auth.us-west-2.amazoncognito.com',
  clientId: process.env.REACT_APP_CLIENT_ID || '3kl7hui7a7p7f9tc5qvpn9pupj',
  responseType: 'token',
  redirectUri: process.env.REACT_APP_BASE_URL  || 'http://localhost:3000',
  signoutUri: process.env.REACT_APP_BASE_URL|| 'http://localhost:3000',
  tokenScopes: [
    "openid",
    "email",
    "profile"
  ],
  UserPoolId: process.env.REACT_APP_USER_POOL_ID || "us-west-2_9np3c0hBN",
  region: process.env.REACT_APP_REGION || "us-west-2",
};
