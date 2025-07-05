const dotenv=require('dotenv')
dotenv.config()
const cookie=require('cookie-parser')
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const morgan=require('morgan')
const rate_limiter=require('express-rate-limit')
const { database } = require('./database')
//body parser 
app.use(express.json({limit:'10kb'}))
app.use(express.urlencoded({extended:true,limit:"10kb"}))
app.use(morgan())
app.use(cookie())
const limiter=rate_limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.
        
    })
    app.use('/',limiter)
    
//global error handler
app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(err.status||500).json({
        status:"error",
        message:err.message || 'internal server error',
        
    })
})
database()
const userRoutes=require('./routes/user.routes')
app.use('/user',userRoutes)

const CourseRoutes=require('./routes/Course.routes')

app.use('/course',CourseRoutes)




// 404 handler
//if we do not get any routes just execute this 
app.use((req,res)=>{
    res.status(404).json({
        status:"error",
        message:"message not found "
    })
})

app.listen(3000,()=>{
    console.log("the server is running at port 3000")
})