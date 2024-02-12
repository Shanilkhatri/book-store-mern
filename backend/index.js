// import express
import express from "express";
// make a config.js file for config related info
// import PORT from the same
import  {PORT, MONGO_DB_URL}  from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

// initialize express through a variable
const app = express()

// to parse json successfully we'll make our app use a middleware
app.use(express.json()) 

// define a route
// using app.get() method
app.get('/',(req,res)=>{
    console.log("we are on default route with req: ",req)
    res.status(200).send("It worked!!")
})
// route for adding a new book
app.post('/books',async (req,res)=>{
    // opening a try-catch 
    try{
        // check for valid fields
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(400).send({
                message: "Please check all the fields and submit the form again!"
            })
            
        }
        const newbook = {
            title : req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear
        }
        let book = await Book.create(newbook)
        res.status(200).send(book)
    }catch(err){
        console.log("Error creating new book: ",err)
        res.status(500).send({
            message : err.message
        })
    }
})
mongoose.connect(MONGO_DB_URL).then(()=>{
    // connected successfully to DB
    console.log("Connected Successfully to the DB")
    // make the app listen to the imported port
    app.listen(PORT,()=>{
        // callback func
        console.log("App listening on port: ",PORT)
    })
}).catch((error)=>{
    console.log("Error connecting to DB: ",error)
})