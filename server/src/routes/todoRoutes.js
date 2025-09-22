import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
});

router.post("/" , (req , res) => {
    const insertTodo = db.prepare(`INSERT INTO todos (user_id , task) VALUES ( ? , ?)`);
    console.log("req.userId:", req.userId);

    const result  = insertTodo.run(req.userId , req.body.task)
    res.json({id : result.lastInsertRowid , task : req.body.task , iscompleted : 0})
})


router.put("/:id" , (req , res)=>{
    const {task} = req.body;
    const {id} = req.params;

    const updateTodo = db.prepare(`UPDATE todos SET task = ? , user_id = ? WHERE id = ?`);

    const result = updateTodo.run(task , req.userId , id );

    res.json({result: result , message : "Todo updated succesfully"});
})

router.delete("/:id" , (req , res)=>{
    const {id} = req.params;

    const delTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    const result = delTodo.run(id , req.userId);
    res.json({result:result , message:"Todo deleted Successfullty"});
})
export default router;