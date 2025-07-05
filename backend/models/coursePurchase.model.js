const mongoose = require('mongoose');

const coursePurchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    refundId: {
        type: String,
        required: false
    },
    refundAmount: {
        type: Number,
        required: false
    },
    refundReason: {
        type: String,
        required: false
    },
    metadata:{
        type:Map,
        of:String 
    }
},
{
    timestamps:true,
    lastActive:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

coursePurchaseSchema.index({user:1,course:1})


const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema);

module.exports = CoursePurchase;