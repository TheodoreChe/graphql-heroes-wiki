const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: String,
  movementPoints: Number,
  townId: String,
});

export default mongoose.model('Hero', heroSchema);
