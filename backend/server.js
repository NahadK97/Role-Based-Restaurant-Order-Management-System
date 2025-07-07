require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");  //updated for web sockets
const http = require("http");
const { Server } = require("socket.io");

const menuRoutes = require("./routes/menu.js");
const orderRoutes = require("./routes/order.js");
const tableRoutes = require("./routes/table.js");
const userRoutes = require("./routes/user.js");

// express app
const app = express();
const server = http.createServer(app); // Create HTTP server
//web sockets update
// setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend origin (change to frontend URL in production)
    methods: ["GET", "POST"]
  }
});

// middleware
app.use(cors());
app.use(express.json());

// log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// routes
app.use("/api/:id/orders", orderRoutes);
app.use("/api/:id/tables", tableRoutes);
app.use("/api/:id/menu", menuRoutes);
app.use("/api/user", userRoutes);

// socket.io logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// connect to db and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("✅ Connected to DB and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to the database:", error);
  });
