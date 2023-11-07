const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  home: '/',
  login: '/login',
  signip: '/signup',
  error: '*',
 };
