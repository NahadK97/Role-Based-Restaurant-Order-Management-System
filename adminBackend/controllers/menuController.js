const Menu = require("../models/menuModel");
const mongoose = require("mongoose");

// get all items
const getItems = async (req, res) => {
  const user_id = req.user.RID;

  const menu = await Workout.find({ user_id });

  res.status(200).json(menu);
};

// get a single item
const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such item" });
  }

  res.status(200).json(workout);
};

// create new item
const createItem = async (req, res) => {
  const { name, price, image, category } = req.body;
  // add doc to db
  try {
    const RID = req.user.RID;
    const item = await Menu.create({ name, price, image, category, RID });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Menu.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

// update an item
const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such item" });
  }

  const item = await Menu.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!item) {
    return res.status(400).json({ error: "No such item" });
  }

  res.status(200).json(item);
};

module.exports = {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
};
