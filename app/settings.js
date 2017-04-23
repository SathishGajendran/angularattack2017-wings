/** 
 * @module app/settings
 * @name settings
 * @description It have application settings.
 * @returns {object} settings
 */

/** settings */
let settings = {
    /** environment */
    environment: 'local',
    /** port */
    port: 5000,
    /** db */
    db: {
        hostname: 'ds111851.mlab.com:11851',
        name: 'wingsfitnessapp',
        username: 'wings',
        password: 'Good@123',
        connectionTimeout: 5000
    },
    domainUrl:'http://localhost:5000/authenticate/'
};

/** exports the settings */
module.exports = settings;
