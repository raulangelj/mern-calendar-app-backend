const express = require("express");

// create express server
const app = express();

// create express router
app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

// listen to port
app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
