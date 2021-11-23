const mongoose = require("mongoose");
const { Schema } = mongoose;

const PasswordSchema = new Schema({
  name: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Password", PasswordSchema);
