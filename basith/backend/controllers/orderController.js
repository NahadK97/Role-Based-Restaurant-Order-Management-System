import Order from "../models/orderModel.js";

//get all orders
const getAllOrders = async (req, res) => {
    const id = req.params.id; //get the unique restaurent id whose orders have to be fetched
    try{
        const orders = await Order.find({RID : id});
        res.status(200).json(orders);
    }
    catch(err) {
        console.log(err.message);
        res.status(404).json({error : err.message})
    }
}

//get a particular table order of a particular restaurent
const getOrderByTable = async (req, res) => {
    const id = req.params.id;
    const table = req.params.table;

    const order = await Order.findOne({RID : id, tableNo : table})
    res.status(200).json(order);
}

//post a new order 
const addNewOrder = async (req, res) => {
    const id = req.params.id;    
    const {tableNo, list} = req.body;
    const status = "placed";
    try {
        const check = await Order.findOne({RID : id, tableNo : tableNo});
        if(!check){
            const order = await Order.create({RID : id, tableNo : tableNo, status : status, list : list})
            res.status(201).json(order);
        }
        else res.status(200).json({error : "given table is already occupied!"})
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({error : err.message})
    }
}

//patch an order
const editOrder = async (req, res) => {
    const {id, table} = req.params;
    try {
        const order = await Order.findOneAndUpdate({RID : id, tableNo : table},{...req.body})
        res.status(200).json(order);
    }
    catch(err){
        res.status(400).json({error : err.message})
    }
}

//delete an order
const deleteOrder = async (req, res) => {
    const {id, table} = req.params;
    const order = await Order.findOneAndDelete({RID : id, tableNo : table});
    if(!order) res.status(400).json({error : "no such order found"})
    res.status(200).json(order);
}

export { addNewOrder, deleteOrder, editOrder, getAllOrders, getOrderByTable };
