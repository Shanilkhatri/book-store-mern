// import express
import express from "express";
// make a config.js file for config related info
// import PORT from the same
import  {PORT, MONGO_DB_URL}  from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
// cors policy "npm i cors"
import cors from 'cors'
// initialize express through a variable
const app = express()

// to parse json successfully we'll make our app use a middleware
app.use(express.json()) 

// use cors middleware to eliminate cors policy warnings when using microservices
app.use(cors()) // either this or

// this
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:['GET','PUT','POST','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

// use a middleware we made for books to route named booksRoute.js
app.use('/books',booksRoute)



// define a route
// using app.get() method
app.get('/',(req,res)=>{
    console.log("we are on default route with req: ",req)
    res.status(200).send("It worked!!")
})

// connect to DB
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