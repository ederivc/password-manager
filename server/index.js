const express = require("express");
const dbConnection = require("./config/db");

const app = express();
dbConnection();

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running");
});
