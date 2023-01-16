const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  mainPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
  notFoundPagePath: () => '*',
};

export default routes;
