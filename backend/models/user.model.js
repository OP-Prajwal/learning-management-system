const mongoose=require('mongoose')

const bcrypt=require('bcryptjs')
const crypto=require('crypto')


const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'name is req '],
        trim:true,
        MaxLength:[50,"name cannot exceed 50 characters"]
    },
    email:{
        type:String,
        required:[true,'name is req '],
        unique:true,
        lowercase:true,
        trim:true,
        MaxLength:[50,"name cannot exceed 50 characters"]
    },
    password:{
        type: String,
        required:[true,"Password cannot be empty"],
        minLength:[4,"password should be more than 4 digits"],
        select:false
    },
    role:{
        type:String,
        enum:{
            values:["student","instructor","admin"],
            message:"please select a valid role "
        },
        default:"student"
    },
    avatar:{
        type:String,
        default:"default-avatar.png"
    },
    bio:{
        type:String,
        maxLength:[200,"cannot exceed more than 200 "]
    },
    enrolledCourses:[
        {
            courses:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            },
            enrolledAt:{
                type:Date,
                default:Date.now 
            }
        }
    ],
    createdCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    lastActive:{
        type:Date,
        default:Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

},{
    timestamps:true,
    lastActive:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

userSchema.pre('save',async function (next) {
    if(!this.isModified("password")){
        return next()
    }
  this.password=await bcrypt.hash(this.password,12)
  next()
    
})

userSchema.methods.comparePassword=async function (enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
    
}
userSchema.methods.getResetPassword=async function () {
    const resetToken=crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire=Date.now()+10*60*1000 
    return resetToken
    
}

//virtual field for total enrolled courses

userSchema.virtual('totalEnrolledCourses').get(function(){
    return this.enrolledCourses.length
})

const User = mongoose.model('User', userSchema)
module.exports = { User }