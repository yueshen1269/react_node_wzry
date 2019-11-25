
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  title: {type: String},
  avatar: {type: String},
  alias: {type: String},
  evaluate: {
    attack: {type: String},
    defence: {type: String},
    difficulty: {type: String},
    magic: {type: String},
  },
  heroId: {type: String},
  isWeekFree: {type: String},
  roles: [{type: mongoose.SchemaTypes.ObjectId, ref: "Category"}],

});

module.exports = mongoose.model("Hero", schema);
