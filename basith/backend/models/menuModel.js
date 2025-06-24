import mongoose from "mongoose";

//create a Schema instance
const Schema = mongoose.Schema;

//define the schema
const menuSchema = new Schema({
    RID : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    dishes : {
        type : [
                {
                    name : {
                        type : String,
                        required : true
                    },
                    price : {
                        type : Number,
                        required : true
                    },
                    img : {
                        type : String
                    }
                }
        ],
        default : []
    }

});

export default mongoose.model('Menu',menuSchema);