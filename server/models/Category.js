
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: { type: String },
  parents: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
});

module.exports = mongoose.model("Category", schema);
