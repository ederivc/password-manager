const express = require("express");
const dbConnection = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dbConnection();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

PORT = process.env.PORT || 5000;

app.use("/api/auth", require("./routes/Auth"));
app.use("/api/users", require("./routes/Users"));
app.use("/api/password", require("./routes/Password"));
app.use("/api/categories", require("./routes/Category"));

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Server is running");
});
