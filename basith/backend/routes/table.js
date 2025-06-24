import express from "express";
import { addNewTable, addOrdersToTable, deleteTable, getAllTables, getSingleTable } from "../controllers/tableController.js";

const router = express.Router({ mergeParams: true });

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

export default router;