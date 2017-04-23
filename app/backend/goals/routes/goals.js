/**
 * @module app/backend/core/routes
 * @description Core Routes
 */

let Goal = require('.././controllers/goal');

module.exports = (app) => {
    app.route('/goals')
        .get(Goal.getAll)
        .post(Goal.save);

    app.route('/goals/activity')
        .get(Goal.getAllActivity)
        .post(Goal.saveActivity);
};
