import express from 'express';
import "dotenv/config"
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser'; 
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import  conversationRoutes from './routes/conversationRoutes.js'
import {v2 as cloudinary} from 'cloudinary'

const app=express();

connectDB();
const PORT=process.env.PORT || 5000;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
app.use(express.json({limit:"50mb"})); //to parse json data in req.body
app.use(express.urlencoded({extended:true, limit:"50mb"})); //to parse form data in req.body
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/conversations',conversationRoutes)


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})  