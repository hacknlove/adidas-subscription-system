import cookieParser from 'cookie-parser';
import app from 'shared/setUpExpress.js';
import startup from 'shared/startup.js';

app.use(cookieParser());

startup();