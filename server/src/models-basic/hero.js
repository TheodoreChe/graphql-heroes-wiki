const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: String,
  movementPoints: Number,
  townId: String,
});

module.exports = mongoose.model('Hero', heroSchema);
