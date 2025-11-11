import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  //coures code like CS101
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: String,//Fall 2024, Spring 2025
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true // adds createdAt & updatedAt
});

export default mongoose.model("Course", courseSchema);