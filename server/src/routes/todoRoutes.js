import express from 'express'
import db from '../db.js'
import prisma from '../prismaClient.js';

const router = express.Router()

// Get all todos for logged-in user
router.get('/', async(req, res) => {
    
    const todos = await prisma.todo.findMany({
        where:{
            userId : req.userId
        }
    })
    res.json(todos)
});

router.post("/" , async (req , res) => {

    const { task} = req.body ;

    const todo = await prisma.todo.create({
        data: {
            task :task ,
            userId : req.userId
        }
    })
    res.json(todo)
})


router.put("/:id" , async (req , res)=>{
    const {task} = req.body;
    const {id} = req.params;

    

    const updateTodo = await prisma.todo.update({
        where : {
            id : parseInt(id)
        },
        data : {
            task : task  
        }
    })
  

    res.json(updateTodo);
})

router.delete("/:id" , async (req , res)=>{
    const {id} = req.params;

  

    const delTodo = await prisma.todo.delete({
        where:{
            id : parseInt(id) ,
            userId : req.userId
        }
    })
   
    res.json(delTodo);
})
export default router;