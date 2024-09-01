import express from 'express';
import userAuthRouter from './src/routes/userAuthRouter.js';
import blogsRouter from './src/routes/blogsRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import './src/models/dbConnection.js';
dotenv.config();

const  app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.use(cors({ origin: "http://localhost:5173" })); // to connect frontend to backend

app.use('/auth' , userAuthRouter);

app.use('/blogs' , blogsRouter)





app.get('/' , (req,res)=>{
    res.send("Hello")
})


app.listen(PORT , ()=>{
    console.log(`Example App running on port ${PORT}`);
})

