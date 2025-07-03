const mongoose = require("mongoose");
//create a Schema instance
const Schema = mongoose.Schema;

//define the schema
const orderSchema = new Schema({
    RID : {
        type : String,
        required : true
    },
    tableNo : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : ["placed", "preparing", "prepared","locked", "delivered"],
    },
    list : [
        {
            name : {
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            description : {
                type : String
            }
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);