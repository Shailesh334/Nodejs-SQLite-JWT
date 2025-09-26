import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js'

import prisma from '../prismaClient.js';


const router = express.Router();




router.post('/register' , async (req , res)=>{

        const {username , password} = req.body;
        
        // Encrypting password
        const hashedPassword = bcrypt.hashSync(password , 8);

        // save the new user and hashed password in db

        try{
                const user = await prisma.user.create({
                    data :{
                        username : username ,
                        password : hashedPassword
                    }
                })

            // now that we have user in db insert default task for this user in todo db
                const defaultTodo = `Hello :) Add your first task `;
                
                await prisma.todo.create({
                    data:{
                        task : defaultTodo ,
                        userId : user.id
                    }
                })
                

            // create token for this user and send it to frontend
                const token = jwt.sign({id: user.id } , process.env.JWT_SECRET_KEY , {expiresIn: '24h'});
                res.json({token});

        }
        catch(err){
                console.log(err.message);
                res.sendStatus(503)
        }


})




router.post('/login' , async(req , res)=>{

        const {username , password } = req.body;

        try{
        // Get the user
            const user = await prisma.user.findUnique({
                where :{
                    username : username
                }
            })

        // if user doesnt exists return error
            if(!user)return res.status(404).send({message : "User not found"})

        // Check the entered password matches the password in db
            const isPasswordValid = bcrypt.compareSync(password , user.password)
        
        // If the password does not match return error
            if(!isPasswordValid) return res.status(401).send({ message: "Invalid password" });

        // then we have a successful authentication
            const token = jwt.sign({id : user.id} , process.env.JWT_SECRET_KEY , {expiresIn: '24h'})
            res.json({token});
        }
        catch(err){
            console.log(err.message);
            res.sendStatus(503)
        }

})



export default router;