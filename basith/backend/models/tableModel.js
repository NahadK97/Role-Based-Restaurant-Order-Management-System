import mongoose from "mongoose";

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

export default mongoose.model('Table',tableSchema);