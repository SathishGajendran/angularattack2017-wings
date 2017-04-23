/**
 * @module app/backend/core/routes
 * @description Core Routes
 */

var _ = require('lodash');

module.exports = (app) => {
    app.route('/users/me')
        .get((req, res) => {
            if (req.user) {
                let user = {
                    displayName: _.get(req, 'user.displayName', ''),
                    name: _.get(req, 'user.name', ''),
                    email: ((req.user.emails).find((item) => { return (item.type === 'account'); })).value,
                    photos: req.user.photos[0].value,
                    gender: _.get(req, 'user.gender', '')  
                };
                res.status(200)
                    .jsonp(user);
            } else {
                res.status(400).jsonp({});
            }
        });
};
