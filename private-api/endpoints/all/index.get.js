import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';

export default [
  authentication,
  pipeFetchFactory(() => [`${process.env.SUBSCRIPTION_URL}/all`])
];