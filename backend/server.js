require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menu.js");
const orderRoutes = require("./routes/order.js");
const tableRoutes = require("./routes/table.js");
const userRoutes = require("./routes/user");
const cors = require("cors");
// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/:id/orders", orderRoutes);
app.use("/api/:id/tables", tableRoutes);
app.use("/api/:id/menu", menuRoutes);
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
