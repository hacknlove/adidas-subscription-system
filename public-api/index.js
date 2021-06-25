/**
 * @apiDefine Authorization
 * @apiHeader (Header) {String} [Authorization] "bearer " + authentication token.
 * 
 * Alternatively a cookie named jwt or query parameter named jwt can be used to send the authentication token at your convenience.
 */

/**
 * @apiDefine newsletterId
 * @apiParam (param) {ObjectId} newsletterId Id of the newsletter
 */

/**
 * @apiDefine email
 * @apiParam (param) {string} email email to operate with
 */

import cookieParser from 'cookie-parser';
import app from 'shared/setUpExpress.js';
import startup from 'shared/startup.js';

app.use(cookieParser());

startup();