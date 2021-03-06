/**
 * @module app/config/init
 * @description Application configuration and initialization
 * @requires db, express
 */
/** modules */
var Database = require('./database'),
    Express = require('./express');

/** DB configuration */
module.exports.db = null;

/** @function
 * @name init
 * @description Init after db connection
 * @requires DB, Express
 */
module.exports.init = (callback) => {
    Database.connect(this.db, (dbCon) => {
        let express = Express.init(dbCon);
        callback(express);
    });
};

/** @function
 * @name start
 * @description Init and Start
 */
module.exports.start = (port, db) => {
    this.db = db;
    this.init((app) => {
        app.listen((process.env.PORT || port), () => {
            console.log('--: Application Started :--');
            console.log('--: Port :- ' + (process.env.PORT || port) +  ' :--')
        });
    });
};
