import express from "express";
import { addNewOrder, deleteOrder, editOrder, getAllOrders, getOrderByTable } from "../controllers/orderController.js";

const router = express.Router({ mergeParams: true });
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

export default router;