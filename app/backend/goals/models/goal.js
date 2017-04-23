var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let Goal = new Schema({
    goal: {
        type: String,
        required: true,
        trim: true
    },
    goalType: {
        type: String,
        required: true,
        trim: true
    },
    isWeightLose: {
        type: Boolean,
        default: false
    },
    currentWeight: {
        type: Number
    },
    goalWeight: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'progress'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    activity: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'GoalActivity'
        }
    ]
}, {
    versionKey: false
});

module.exports = mongoose.model('Goal', Goal);