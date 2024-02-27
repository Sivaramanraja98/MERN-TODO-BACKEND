const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
//Database connection
const connecttoDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};

module.exports = connecttoDB;
