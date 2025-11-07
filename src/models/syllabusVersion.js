const mongoose = require('mongoose');

const syllabusVersionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User ID is required'],
        index: true
    },
    courseId: {
        type: String,
        ref: 'Courses',
        required: [true, 'Course ID is required'],
        trim: true,
        index: true
    },
    version: {
        type: Number,
        required: [true, 'Version is required'],
        trim: true,
        maxlength: [50, 'Version cannot exceed 50 characters'],
        default: '1.0'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    notes: {
        type: String,
        trim: true,
    },
    isCurrent: {
        type: Boolean,
        default: false
    } 
},  { timestamps: true });

syllabusVersionSchema.index({ courseId: 1, version: -1 },{ unique: true });

const SyllabusSchema = moongoose.model('SyllabusVersion', syllabusVersionSchema);
module.exports = SyllabusSchema.model;
