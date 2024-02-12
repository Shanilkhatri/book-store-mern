import mongoose from "mongoose";

// mongoose has a schema() method which we can use to define a schema for your DB table
const bookSchema = mongoose.Schema(
{
    title:{
        type : String,
        required: true
    },
    author:{
        type : String,
        required: true
    },
    publishYear:{
        type : Number,
        required: true
    },
},
{
    timestamps : true
}
)
// initialize the model with created schema
export const Book = mongoose.model('Book',bookSchema)