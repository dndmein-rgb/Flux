import express from 'express';
import path from 'path'
import "dotenv/config"
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser'; 
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import  conversationRoutes from './routes/conversationRoutes.js'
import {v2 as cloudinary} from 'cloudinary'
import {app, server} from './socket/socket.js'


connectDB();
const PORT=process.env.PORT || 5000;
const __dirname=path.resolve();

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

// Root route for testing
app.get('/api', (req, res) => {
    res.json({ message: 'API is running' })
})

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "frontend/dist")))

// Catch-all route to serve index.html for any non-API routes
app.get(/^\/(?!api).*/, (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})


server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})  