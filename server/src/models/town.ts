const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const townSchema = new Schema({
  name: String,
});

export default  mongoose.model('Town', townSchema);
