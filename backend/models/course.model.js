const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: [100, 'course title cannot exceed 100 chars ']
    },
    subTitle: {
        type: String,
        required: true,
        trim: true,
        maxLength: [200, 'course subtitle cannot exceed 100 chars ']
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: [true, "enter the category "],
        trim: true
    },
    level: {
        type: String,
        enum: {
            values: ['beginner', 'intermediate', 'advanced']
        },
        default: 'beginner'
    },
    price: {
        type: Number,
        required: [true, 'course price is required '],
        min: [0, 'course price should be a non negative num ']
    },
    thumbnail: {
        type: String,
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture"
    }],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    totalLectures: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    lastActive: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

courseSchema.virtual("averageRating").get(function () {
    return 0;
});

courseSchema.pre('save', function (next) {
    if (this.lectures) {
        this.totalLectures = this.lectures.length;
    }
    next();
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course; // Ensure the correct export