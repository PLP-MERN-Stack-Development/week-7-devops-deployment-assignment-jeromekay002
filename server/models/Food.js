const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String,
  image: String, // filename or URL
});

module.exports = mongoose.model("Food", foodSchema);
