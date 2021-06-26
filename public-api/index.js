/**
 * @apiDefine token
 * @apiParam (path) {String} token authentication token.
 */

/**
 * @apiDefine newsletterId
 * @apiParam (path) {ObjectId} newsletterId Id of the newsletter
 */

/**
 * @apiDefine email
 * @apiParam (path) {string} email email to operate with
 */

import cookieParser from 'cookie-parser';
import app from 'shared/setUpExpress.js';
import startup from 'shared/startup.js';

app.use(cookieParser());

startup();
