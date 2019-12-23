const express=require('express');
const app=express();
const authRoute=require('./routes/auth');
const dotenv=require('dotenv')
const mongoose=require('mongoose');
const postRoute=require('./routes/post')
dotenv.config()
PORT=process.env.PORT||5000;
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true},()=>console.log("MongoDB Connected"));
//Middleware
app.use(express.json());
//Route Middleware
app.use('/api/users',authRoute);
app.use('/api/posts',postRoute  )

app.listen(PORT,()=>console.log(`server running on Port ${PORT}`));