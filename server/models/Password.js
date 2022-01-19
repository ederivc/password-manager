const mongoose = require("mongoose");
const { Schema } = mongoose;

const PasswordSchema = new Schema({
  name: { type: String, unique: true },
  password: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  categoryName: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Password", PasswordSchema);
