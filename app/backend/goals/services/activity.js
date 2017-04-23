var BlueBird = require('bluebird'),
    GoalActivty = require('.././models/goal-activity');

exports.getAll = () => {
    return new BlueBird((resolve, reject) => {
        GoalActivty
            .find({})
            .populate('goalId')
            .exec((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
    });
};

exports.save = (data) => {
    return new BlueBird((resolve, reject) => {
        let activity = GoalActivty(data);
        activity.save((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    });
};