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
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

// create express router
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
