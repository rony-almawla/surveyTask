const { mongoose } = require("mongoose");

const connectToMongoDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/surveydb")
  const connection = mongoose.connection;
  connection.on("error", (error) => {
    console.log("Error connection to MongoDB: ", error);
  });

  connection.once("open", () => {
    console.log("Connected to MongoDB...");
  });
};

module.exports = { connectToMongoDB };
