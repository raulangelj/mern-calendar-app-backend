const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");

// create express server
const app = express();

// database
dbConnection();

// CORS
app.use(cors());

// Public dir
app.use(express.static("public"));

// read and parse body
app.use(express.json());

// create express router
app.use("/api/auth", require("./routes/auth"));
// TODO CRUD: EVENTS

// listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
