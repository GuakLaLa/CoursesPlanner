const Assignment = require('../models/assignment.js');
const Courses = require('../models/course.js');

//Create new assignment
async function createAssignment(req, res){
    try{
        const userId = req.user._id;

        const { id: courseId } = req.params;

        const {
            title,
            dueDate,
            points,
        } = req.body;   

        //Check if course exists
        const course = await Courses.findOne({ _id: courseId });
        if(!course){
            return res.status(404).send("Course not found");
        }

        //validate dueDate
        const due = new Date(dueDate);
        if (isNaN(due.getTime()) || due < new Date()) {
            return res.status(400).json({ error: "Due date must be a valid future date" });
        }

        const newAssignment = new Assignment({
            courseId,
            title,
            dueDate: due,
            points,
            userId
        });

        await newAssignment.save();
        res.status(201).json(newAssignment);

        } catch(error){
            console.log(error);
            res.status(500).json({ error: 'Failed to load assignment page', message: err.message });
        }
}

//Update assignment
async function updateAssignment(req, res){
    try{
        const { courseId, assignmentId } = req. params;
        const updates = req.body;

        //Validate dueDate if it's being updated
        if(updates.dueDate && new Date(updates.dueDate) < new Date()){
            return res.status(400).json("Due date must be a future date");
        }

        //Verify assignment belongs to the course
        const assignment = await Assignment.findOne({ _id: assignmentId, courseId});
        if(!assignment){
            return res.status(404).json("Assignment not found for the specific course");
        }

        Object.assign(assignment, updates);
        const updatedAssignment = await assignment.save();

        res.status(200).json(updatedAssignment);
        
    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed to update assignment', message: err.message });
    }
}

module.exports = { createAssignment, updateAssignment};