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
    const result  = insertTodo.run(req.userId , req.body.task)

    res.json({id : result.lastInsertRowid , task : req.body.task , iscompleted : 0})
})


export default router;