const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, unique: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Category", CategorySchema);
