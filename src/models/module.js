import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  week: {
    type: Number,
    required: true,
    min: [1, "Week number must be at least 1"]
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  //reading materials or descriptions
  reading: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

//Ensure each course can only have one module per week
moduleSchema.index({ courseId: 1, week: 1 }, { unique: true });

export default mongoose.model("Module", moduleSchema);
