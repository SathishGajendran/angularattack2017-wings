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

/** App Start */
let app = require('./config/app');
app.start(port, settings.db);
