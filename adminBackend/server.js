require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menu");
const userRoutes = require("./routes/user");
// express app
const app = express();

// middleware
app.use(express.json());

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/menu", menuRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests once connected to db
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to DB and server is listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
