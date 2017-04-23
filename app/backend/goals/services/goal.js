var BlueBird = require('bluebird'),
    GoalActivity = require('.././models/goal-activity'),
    Goal = require('.././models/goal');

var _ = require('lodash');

exports.getAll = () => {
    return new BlueBird((resolve, reject) => {
        Goal.find({})
            .populate('activity')
            .find((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
    });
};

exports.save = (data) => {
    return new BlueBird((resolve, reject) => {
        let newGoal = Goal(data);
        newGoal.save((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    });
};

exports.updateActivity = (goalId, activityId) => {
    return new BlueBird((resolve, reject) => {
        Goal.findById(goalId)
            .exec((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    let activity = _.get(data, 'activity', []);
                    activity.push(activityId);
                    data.activity = activity;
                    data.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                }
            })
    });
}
