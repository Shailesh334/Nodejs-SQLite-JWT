import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js'



const router = express.Router();




router.post('/register' , (req , res)=>{

        const {username , password} = req.body;

        // Encrypting password
        const hashedPassword = bcrypt.hashSync(password , 8);

        // save the new user and hashed password in db

        try{
                const insertUser = db.prepare(`INSERT INTO users(username , password) VALUES (? , ?)`);
                const data = insertUser.run(username , hashedPassword);
                
            // now that we have user in db insert default task for this user in todo db
                const defaultTodo = `Hello :) Add your first task `;
                const insertTodo = db.prepare(`INSERT INTO todos(user_id , task) VALUES ( ? , ?)`);
                insertTodo.run(data.lastInsertRowid , defaultTodo);

            // create token for this user and send it to frontend
                const token = jwt.sign({id:data.lastInsertRowid} , process.env.JWT_SECRET_KEY , {expiresIn: '24h'});
                res.send(token);

        }
        catch(err){
                console.log(err.message);
                res.sendStatus(503)
        }


})




router.post('/login' , (req , res)=>{

})



export default router;