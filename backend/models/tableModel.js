const mongoose = require("mongoose");
//create a Schema instance
const Schema = mongoose.Schema;

//define the schema
const tableSchema = new Schema({
    RID : {
        type : String,
        required : true
    },
    tableNo : {
        type : Number,
        required : true
    },
    total : {
        type : Number,
        required : true
    },
    orders : [
        {
            name : {
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ]
});

module.exports = mongoose.model('Table', tableSchema);