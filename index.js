const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { dbConnection } = require("./database/config");

// create express server
const app = express();

// database
dbConnection();

// CORS
app.use(cors());

// Public dir
app.use(express.static(__dirname + "/public"));

// read and parse body
app.use(express.json());

// create express router
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
