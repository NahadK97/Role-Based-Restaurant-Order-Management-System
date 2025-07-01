const express = require("express");
const {
  addNewTable,
  addOrdersToTable,
  deleteTable,
  getAllTables,
  getSingleTable
} = require("../controllers/tableController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router({ mergeParams: true });

//middleware
router.use(requireAuth);
// get all tables
router.get('/',getAllTables)
// get a single table details
router.get('/:tableNo',getSingleTable)
// post a new table
router.post('/',addNewTable)
// patch a table
router.patch('/:tableNo/edit',addOrdersToTable)
// delete a table
router.delete('/:tableNo/delete',deleteTable)

module.exports = router;