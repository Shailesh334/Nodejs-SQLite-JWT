import express from 'express'

import path , {dirname} from 'path'
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
dotenv.config();


import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middlewares/authMiddlewares.js';
const app = express()

const PORT = process.env.PORT || 5000 ;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname , "../public" )))

app.use("/auth" , authRoutes);
app.use('/todos' ,authMiddleware, todoRoutes);


app.get("/" , (req , res)=>{
    res.sendFile(path.join(__dirname , "../public" , "index.html"));
})



app.listen(PORT , () => console.log(`Listening on port ${PORT}`))