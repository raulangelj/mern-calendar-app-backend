const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
};

module.exports = {
  dbConnection,
};
