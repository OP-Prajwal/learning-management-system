
const mongoose=require("mongoose")
const Course = require("../models/course.model")

const CourseRegistration=async(req,res)=>{
    const {title,subTitle,description,category,price,thumbnail}=req.body
   
    

    const course=await Course.create({
        title:title,
        subTitle:subTitle,
        description:description,
        category:category,
        price:price,
        thumbnail:thumbnail
    })
    await course.populate({
        path:"instructor",
        select:"name email"
    })
    if(!course){
      return  res.status(400).json({
        message:"something went wrong while creating course "
      })
    }
    res.status(200).json({
        message:"course created ",
        course:course 
    })
}

const getAllCourses=async(req,res)=>{
    
}

module.exports={
    CourseRegistration
}