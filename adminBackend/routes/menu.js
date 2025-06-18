const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
} = require("../controllers/menuController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all menu routes
router.use(requireAuth); // Apply authentication middleware to all menu routes

// GET all menu items
router.get("/", getItems);

// GET a single menu items
router.get("/:id", getItem);

// POST a new item
router.post("/", createItem);

// DELETE an item
router.delete("/:id", deleteItem);

// UPDATE an item
router.patch("/:id", updateItem);

// Export the router
module.exports = router;
