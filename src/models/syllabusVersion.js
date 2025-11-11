const mongoose = require('mongoose');

const syllabusVersionSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: [true, 'Course ID is required'],
        trim: true,
        index: true
    },
    version: {
        type: Number,
        required: [true, 'Version is required'],
        maxlength: [50, 'Version cannot exceed 50 characters'],
        default: '1'
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
        default: true
    },
    lockVersion: {
        type: Number,
        default: 0
    } 
},  { timestamps: true });

syllabusVersionSchema.index({ courseId: 1, version: -1 },{ unique: true });

const SyllabusSchema = mongoose.model('SyllabusVersion', syllabusVersionSchema);
module.exports = SyllabusSchema;
