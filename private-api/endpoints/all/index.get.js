import authentication from 'public/lib/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';

export default [
  authentication,
  pipeFetchFactory(() => [`${process.env.SUBSCRIPTION_URL}/all`])
];