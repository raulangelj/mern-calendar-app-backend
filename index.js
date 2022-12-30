const express = require("express");
require("dotenv").config();

// create express server
const app = express();

// Public dir
app.use(express.static("public"));

// create express router
app.use("/api/auth", require("./routes/auth"));
// TODO CRUD: EVENTS


// listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
