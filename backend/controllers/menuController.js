const Menu = require("../models/menuModel");

//get all menu items
const getAllMenuItems = async (req, res) => {
  const { id } = req.params;
  const menu = await Menu.find({ RID: id });
  // console.log("Sending menu: ", menu); for checking menu
  res.status(200).json(menu);
};
//get a category
const getACategory = async (req, res) => {
  const { id, category } = req.params;
  try {
    const response = await Menu.findOne({ RID: id, category: category });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//create a category
const addNewCategory = async (req, res) => {
  const { id } = req.params;
  const { newCategory } = req.body;
  try {
    const response = await Menu.create({ RID: id, category: newCategory });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: "could not create category" });
  }
};
//add a new dish to a category
const addDishToCategory = async (req, res) => {
  const { id, category } = req.params;
  const { name, price, img } = req.body;
  try {
    const response = await Menu.findOneAndUpdate(
      { RID: id, category: category },
      { $push: { dishes: { name, price, img } } },
      { new: true }
    );
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a dish from a category
const deleteDishFromCategory = async (req, res) => {
  const { id, category, dishId } = req.params;
  try {
    const response = await Menu.findOneAndUpdate(
      { RID: id, category: category },
      { $pull: { dishes: { _id: dishId } } },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "could not delete item" });
  }
};
// delete a category
const deleteCategory = async (req, res) => {
  const { id, category } = req.params;
  try {
    const response = await Menu.findOneAndDelete({
      RID: id,
      category: category,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: "could not delete category" });
  }
};

module.exports = {
  addDishToCategory,
  addNewCategory,
  deleteCategory,
  deleteDishFromCategory,
  getACategory,
  getAllMenuItems,
};
