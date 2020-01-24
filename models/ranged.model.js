const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rangedSchema = new Schema({
    d1: { type: Date, required: true},
    d2: { type: Date, required: true},
});

const Ranged = mongoose.model('Ranged', rangedSchema);

module.exports = Ranged;