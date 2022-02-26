const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 
const mongoose = require('mongoose')

const app = express()
const port = 3001

app.use(cors({origin: '*'}))
app.use(bodyParser.json())

const mongoDbLink = 'mongodb+srv://kruger:<examplePassword>@todo.b8zjp.mongodb.net/<DATABASENAME>?retryWrites=true&w=majority'
mongoose.connect(mongoDbLink)

const TodoModel = mongoose.model('Todo', new mongoose.Schema({title: String, is_done: Boolean}))

app.post('/todo', async (req, res) => {
    const {title} = req.body

    if(!title){
        return res.status(400).json({
            message: "Title value cannot be empty"
        })
    }

    try{
        const todo = new TodoModel({
            title: title,
            is_done: false
        })

        const newTodo = await todo.save()
        

        return res.status(200).json({
            todo: newTodo
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }

})

app.delete('/todo/:id', async (req, res) => {
    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: 'Valid ID must be provided.'
        })
    }

    try{
        const todo = await TodoModel.findById(id);

        if(!todo){
            return res.status(400).json({
                message: 'todo not found'
            })
        }

        await todo.delete()

        return res.status(200).json({})
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

app.put('/todo/:id', async (req, res) => {
    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: 'Valid ID must be provided.'
        })
    }

    try{
        const todo = await TodoModel.findById(id)

        if(!todo){
            return res.status(400).json({
                message: 'Todo not found.'
            })
        }

        todo.is_done = !todo.is_done
        
        await todo.save()

        return res.status(200).json({
            todo: todo
        })
    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
})


app.get('/todos', async (req, res) => {
    try{
        const todos = await TodoModel.find()
        
        return res.status(200).json({
            data: todos,
        })

    }catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
})

app.listen(port, () => {
    console.log(`Examples app listening on https://localhost:${port}`)
})

//mongodb+srv://kruger:test@todo.b8zjp.mongodb.net/todo_list?retryWrites=true&w=majority
//
