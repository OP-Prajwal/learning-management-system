const mongoose=require('mongoose')


const LectureProgressSchema=new mongoose.Schema({
    lectures:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture",
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
watchTime:{
    type:Number,
    default:0 
},
lastWatched:{
    type:Date,
    default:Date.now
}
})

const courseProgressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false 
    },
    completionPercentage:{
        type:Number,
        default:0,
        min:0,
        max:100
    },
   lectureProgress:[LectureProgressSchema],
   lastAccessed:{
    type:Date,
    default:Date.now
   }
   
},
{
    
        timestamps:true,
        lastActive:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    
})


courseProgressSchema.pre('save',function(next){

    if(this.lectureProgress.length>0){
  const completedLectures=this.lectureProgress.filter(lp=> lp.isCompleted).length
 this.completionPercentage= Math.round((completedLectures/this.lectureProgress.length)*100)
  this.isCompleted=this.completionPercentage===100
    }
    next()
})

courseProgressSchema.methords.updateLastAccessed=function(){
    this.lastAccessed=Date.now()
    return this.save({ValidateBeforeSave:false})
}

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema)
module.exports = { CourseProgress }