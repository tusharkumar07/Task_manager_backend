require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //body-parser is used to convert json format into javascript object.
const taskRoutes = require("./routes/task_routes");
const userRoutes = require("./routes/user_routes");
const cors = require("cors");

const app = express();

//app MiddleWare
app.use(bodyParser.json());
app.use(cors(
  {
    origin: ["https://task-manager-livid-kappa.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));

//route MiddleWare
app.use(taskRoutes);
app.use(userRoutes);

// coonect app with MongoDB
const PORT = process.env.PORT;
const DB_URL = process.env.DB;

mongoose
  .connect("mongodb+srv://tusharkumar0510:ZB9BHgDp2Icloe9f@cluster0.fdvnvab.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error: ", err);
  });

// listen express app on port 8000
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
