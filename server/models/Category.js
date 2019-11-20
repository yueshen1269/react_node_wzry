
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  category: { type: String },
});

module.exports = mongoose.model("Category", schema);
