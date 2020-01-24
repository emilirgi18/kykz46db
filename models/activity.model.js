const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema({
    date: { type: Date, required: true},
    type: { type: String, required: true},
    text: { type: String, required: true},
    members: { type: String, required: true}
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;