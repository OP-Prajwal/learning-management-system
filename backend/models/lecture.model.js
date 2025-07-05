const mongoose=require('mongoose')

const lectureSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:[100,'lec title cannot exceed 100 chars ']
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    videoUrl:{
        type:String,
        required:true,
        trim:true,
    },
    duration:{
        type:Number,
        default:0
    },
    publicId:{
        type:String,
        required:True 
    },
    isPreview:{
        type:Boolean,
        default:false
    },
    order:{
        type:Number,
        required:true
    }
   
},
{
    timestamps:true,
    lastActive:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

lectureSchema.pre('save',function(next){
    if(this.duration){
        this.duration=Math.round(this.duration*100)
    }
    next()
})

const Lecture = mongoose.model("Lecture", lectureSchema)
module.exports = { Lecture }