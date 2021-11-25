const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  birthDate: { type: Date },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("User", UserSchema);
