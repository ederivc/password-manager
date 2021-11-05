const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connection;
