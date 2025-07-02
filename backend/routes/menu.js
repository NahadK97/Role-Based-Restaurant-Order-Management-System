const express = require("express");
const {
  addDishToCategory,
  addNewCategory,
  deleteCategory,
  deleteDishFromCategory,
  getACategory,
  getAllMenuItems,
} = require("../controllers/menuController");

const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router({ mergeParams: true });

//middleware
router.use(requireAuth);
//get all menu items
router.get("/", getAllMenuItems);
//get a single category
router.get("/:category", getACategory);
//create a category
router.post("/", addNewCategory);
// add a dish to a category
router.patch("/:category/add-dish", addDishToCategory);
//delete a dish from a category
router.patch("/:category/delete-dish/:dishId", deleteDishFromCategory);
// delete a category
router.delete("/delete/:category", deleteCategory);

module.exports = router;
