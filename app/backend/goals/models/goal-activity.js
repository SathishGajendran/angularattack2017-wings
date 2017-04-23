var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let Goal = new Schema({
    goalId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Goal'
    },
    status: {
        type: String
    },
    weight: {
        type: Number
    },
    progress: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
        versionKey: false
    });

module.exports = mongoose.model('GoalActivity', Goal);