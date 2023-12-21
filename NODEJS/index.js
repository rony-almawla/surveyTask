const express = require("express");
// const { db } = require("./configs/db.configs");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

app.get("/hello", (req, res) => {
  console.log("HELLO!!");
});

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const surveyRoutes = require("./routes/survey.routes");
app.use("/survey", surveyRoutes);

const answerRoutes = require('./routes/answerRoutes');

app.use('/answers', answerRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);


  connectToMongoDB();
});
