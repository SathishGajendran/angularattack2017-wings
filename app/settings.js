/** 
 * @module app/settings
 * @name settings
 * @description It have application settings.
 * @returns {object} settings
 */

/** settings */
let settings = {
    /** environment */
    environment: 'production',
    /** port */
    port: 5000,
    /** db */
    db: {
        // hostname: '127.0.0.1:27017',
        // name: 'wings-fitness',
        // username: '',
        // password: '',
        // connectionTimeout: 5000

      
    },
    domainUrl: 'https://angularattackwings.herokuapp.com/authenticate/'
    // domainUrl: 'http://localhost:5000/authenticate/'
};

/** exports the settings */
module.exports = settings;
