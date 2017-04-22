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
        hostname: 'localhost:27017',
        name: 'wings-fitness',
        username: '',
        password: '',
        connectionTimeout: 5000
    }
};

/** exports the settings */
module.exports = settings;
