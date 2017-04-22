/**
 * @module app/backend/core/routes
 * @description Core Routes
 */

module.exports = (app) => {
    app.route('/')
        .get((req, res) => {
            res.render('index');
        });
};
