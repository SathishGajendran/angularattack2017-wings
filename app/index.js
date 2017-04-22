/**
 * @module app
 * @name app
 * @description Application Module
 * @requires settings, express app
 */

/** Settings */
let settings = require('./settings');

/** Environment variables */
let {environment: environment = 'production', port: port = 4500} = settings;
process.env.WINGS_ENVIRONMENT = process.env.WINGS_ENVIRONMENT || environment;
process.env.WINGS_PORT = process.env.WINGS_PORT || port;

/** App Start */
let app = require('./config/app');
app.start(settings.db);
