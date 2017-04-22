/**
 * @name app/config/database
 * @description Used to connect with MongoDB
 */
// NPM modules
var mongoose = require('mongoose'),
    _ = require('lodash'),
    path = require('path');

/**
 * @function connect
 * @description Used to establish the database connection
 */
module.exports.connect = (db, callback) => {
    let connectionString = 'mongodb://' + _.get(db, 'hostname', '') + '/' + _.get(db, 'name', ''),
        options = {
            user: _.get(db, 'username', ''),
            pass: _.get(db, 'password', ''),
            connectionTimeout: _.get(db, 'connectionTimeout', 5000)
        },
        dbCon,
        self = this;
    dbCon = mongoose.connect(connectionString, options);
    // Mongoose Connection Event
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected with MongoDB: ' + (new Date()).toISOString());
        if (callback) {
            callback(dbCon);
        }
    });
    // Mongoose Disconnection Event
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB Connection Closed: ' + (new Date()).toISOString());
    });
    // Mongoose Connection Error Event
    mongoose.connection.on('error', (error) => {
        console.log('MongoDB Connection Error: ' + (new Date()).toISOString());
        console.log(error);
    });
};