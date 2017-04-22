/**
 * @module app/config/env
 * @name default
 * @description Default configurations for all environments
 */

/** config */
let config = {
    /** session configuration */
    session: {
        key: 'wings-app',
        secret: 'wings-app',
        collection: 'sessions',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: false
        }
    },

    /** server view engine */
    templateEngine: 'pug'
};

/** exports module */
module.exports = config;
