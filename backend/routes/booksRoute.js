import express from 'express'
import { Book } from '../models/bookModels.js'

const router = express.Router();

// route for adding a new book
router.post('/',async (req,res)=>{
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

// route for getting all the books
router.get("/",async (req,res)=>{
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count : books.length,
            data : books
        })
    }catch(err){
        console.log("Error while getting books: ",err)
        res.status(400).send({
            message : err.message
        })
    }
})
// route for getting a specific book
router.get("/:id",async (req,res)=>{
    try{
        // destructuring id
        const {id} = req.params
        const book = await Book.findById(id)
        return res.status(200).json({
            data : book == null ? "Book not found" : book
        })
    }catch(err){
        console.log("Error while getting books: ",err)
        res.status(400).send({
            message : err.message
        })
    }
})
// route for updating a book
router.put('/:id', async (req,res)=>{
    try{
        // check for valid fields
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            res.status(400).send({
                message: "Please check all the fields and submit the form again!"
            })
            
        }
        const updatedBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear
        }
        // destructure the id
        const {id} = req.params;
        let result = await Book.findByIdAndUpdate(id,updatedBook)
        if (!result){
            return res.status(400).send({
                message : "Book not found!"
            })
        }
        return res.status(200).send({
            message: "Book updated successfully!"
        })
    }catch(err){
        console.log("Error Updating Book: ",err)
        res.status(400).send({
            message: err.message
        })
    }
})
// route for deleting a book
router.delete('/:id', async (req,res)=>{
    try {
        // destructure id 
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if (!result){
            return res.status(400).send({
                message: "Book not found!"
            })
        }
        return res.status(200).send({
            message: "Book deleted successfully!"
        })
    } catch (error) {
        console.log("error deleting book: ",error)
        res.status(400).send({
            message : error.message
        })
    }
})

export default router;