import Menu from "../models/menuModel.js";

//get all menu items
const getAllMenuItems = async (req, res) => {
    const {id} = req.params
    const menu = await Menu.find({RID : id})
    res.status(200).json(menu)
}
//get a category
const getACategory = async (req, res) => {
    const {id, category} = req.params;
    try {
        const response = await Menu.findOne({RID : id, category : category})
        res.status(200).json(response)
    }
    catch(err) {
        res.status(400).json({error : err.message})
    }
}
//create a category
const addNewCategory = async (req, res) => {
    const {id} = req.params;
    const {newCategory} = req.body;
    try {
        const response = await Menu.create({RID : id,category : newCategory})
        res.status(201).json(response);
    }
    catch(error) {
        res.status(400).json({error : "could not create category"})
    }
}
//add a new dish to a category
const addDishToCategory = async (req, res) => {
    const {id, category} = req.params;
    const {name, price, img} = req.body;
    try {
        const response = await Menu.findOneAndUpdate({RID : id, category : category}, {$push : {dishes : {name, price, img}}}, {new : true})
        res.status(201).json(response);
    }
    catch(err)  {
        res.status(400).json({error : err.message})
    }
}
// put a category
const editCategoryName = async (req, res) => {
    const {id, category} = req.params;
    const {newName} = req.body;
    try {
        const response = await Menu.findOneAndUpdate({RID : id, category : category},{$set:{category : newName}}, {new : true})
        res.status(200).json(response);
    }
    catch(error) {
        res.status(400).json({error : "could not modify category"})
    }
}
//edit a dish name of a particular category
const editDish = async (req, res) => {
    const {id, category} = req.params;
    const { oldName, newName, newPrice, newImg } = req.body;
    try {
        const updateFields = {};
        if (newName) updateFields["dishes.$.name"] = newName;
        if (newPrice !== undefined) updateFields["dishes.$.price"] = newPrice;
        if (newImg !== undefined) updateFields["dishes.$.img"] = newImg;
        const response = await Menu.findOneAndUpdate({RID : id, category : category, "dishes.name" : oldName},
             {$set : updateFields}, {new : true})
        res.status(200).json(response);
    }
    catch(err) {
        res.status(400).json({error : err.message})
    }
}
//delete a dish from a category
const deleteDishFromCategory = async (req, res) => {
    const {id, category, dishName} = req.params;
    try {
        const response = await Menu.findOneAndUpdate({RID : id, category : category}, {$pull : {dishes : {name : dishName}}}, {new : true})
        res.status(200).json(response);
    }
    catch(error) {
        res.status(400).json({error : "could not delete item"});
    }
}
// delete a category
const deleteCategory = async (req, res) => {
    const {id, category} = req.params
    try {
        const response = await Menu.findOneAndDelete({RID : id, category : category});
        res.status(200).json(response);
    }
    catch(error) {
        res.status(400).json({error : "could not delete category"})
    }
}
//delete whole menu
const deleteAllCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const response = await Menu.deleteMany({RID : id});
        res.status(200).json({deletedCount : response.deletedCount});
    }
    catch(error) {
        res.status(400).json({error : "could not complete delete operation"})
    }
}

export { addDishToCategory, addNewCategory, deleteAllCategory, deleteCategory, deleteDishFromCategory, editCategoryName, editDish, getACategory, getAllMenuItems };

