import Table from "../models/tableModel.js";

// get all tables
const getAllTables = async (req, res) => {
  const { id } = req.params;
  try {
    const tables = await Table.find({ RID: id });
    res.status(200).json(tables);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// get a single table details
const getSingleTable = async (req, res) => {
  const { id, tableNo } = req.params;
  try {
    const table = await Table.findOne({ RID: id, tableNo });
    if (!table) return res.status(200).json(null);
    res.status(200).json(table);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// post a new table
const addNewTable = async (req, res) => {
  const { id } = req.params;
  const { tableNo, total, orders } = req.body;

  try {
    const existing = await Table.findOne({ RID: id, tableNo });
    if (existing) {
      return res.status(400).json({ error: 'Table already exists' });
    }

    const newTable = await Table.create({
      RID: id,
      tableNo,
      total,
      orders: orders || []
    });

    res.status(201).json(newTable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// patch a table
const addOrdersToTable = async (req, res) => {
  const { id, tableNo } = req.params;
  const { orders , total} = req.body; // orders = [{name, quantity}, ...]

  try {
    const updatedTable = await Table.findOneAndUpdate(
      { RID: id, tableNo },
      { $push: { orders: { $each: orders } }, $inc : {total : total} },
      { new: true }
    );

    if (!updatedTable) return res.status(404).json({ error: 'Table not found' });

    res.status(200).json(updatedTable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// delete a table
const deleteTable = async (req, res) => {
  const { id, tableNo } = req.params;

  try {
    const deleted = await Table.findOneAndDelete({ RID: id, tableNo });
    if (!deleted) return res.status(404).json({ error: 'Table not found' });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { addNewTable, addOrdersToTable, deleteTable, getAllTables, getSingleTable };

