const express = require("express");
const {
  addNewOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderByTable
} = require("../controllers/orderController");

const { requireAuth } = require("../middleware/requireAuth");
const router = express.Router({ mergeParams: true });
//middleware
router.use(requireAuth);
//get all orders
router.get('/',getAllOrders);
//get a single order by table no
router.get('/table/:table',getOrderByTable);
//post a new order
router.post('/',addNewOrder);
//patch an order
router.patch('/edit/:table',editOrder);
//delete an order
router.delete('/delete/:table',deleteOrder);

module.exports = router;