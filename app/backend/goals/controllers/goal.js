
Goal = require('.././services/goal');
GoalActivity = require('.././services/activity');

var _ = require('lodash');

exports.getAll = (req, res) => {
    Goal.getAll()
        .then((result) => {
            res.status(200)
                .jsonp(result);
        })
        .error((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: error
                });
        })
        .catch((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: error
                });
        });
};

exports.save = (req, res) => {
    req.body.email = ((req.user.emails).find((item) => { return item.type === 'account'; })).value;
    Goal.save(req.body)
        .then((result) => {
            res.status(200)
                .jsonp(result);
        })
        .error((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: 'Internal Server error'
                });
        })
        .catch((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: 'Internal Server error'
                });
        });
};

exports.saveActivity = (req, res) => {
    req.body.email = ((req.user.emails).find((item) => { return item.type === 'account'; })).value;
    var response = {};
    GoalActivity.save(req.body)
        .then((result) => {
            response = result;
            return Goal.updateActivity(result.goalId, result._id);
        })
        .then((result) => {
            res.status(200)
                .jsonp(response);
        })
        .error((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: 'Internal Server error'
                });
        })
        .catch((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: 'Internal Server error'
                });
        });
};

exports.getAllActivity = (req, res) => {
    var response = [];
    GoalActivity.getAll()
        .then((result) => {
            response = result;
            return null;
        })
        .then(() => {
            res.status(200)
                .jsonp(response);
        })
        .error((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: error
                });
        })
        .catch((error) => {
            res.status(400)
                .jsonp({
                    code: 400,
                    status: 'error',
                    message: error
                });
        });
};