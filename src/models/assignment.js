const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    courseId: {
        type: String,
        ref: "Courses",
        required: [true, 'Course ID is required'],
        trim: true,
        index: true
    },
    title: {
        type: String,
        required: [true, 'Assignment title is required'],
        trim: true,
        maxLength:  [200, 'Assignment title cannot exceed 200 characters']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        index: true
    },
    points: {
        type: Number,
        required: [true, 'Points value is required'],
        min: [0, 'Points cannot be negative'],
        default: 0
    }
}, {timestamps: true });

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
