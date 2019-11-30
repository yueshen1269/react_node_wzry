const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {type: String},
  password: {
    type: String,
    select: false,
    set(value) {
      return require("bcryptjs").hashSync(value, 10);
    }
  }
});

module.exports = mongoose.model("AdminUser", schema);
