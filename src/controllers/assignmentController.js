const Assignment = require('../models/assignment.js');
const Courses = require('../models/course.js');

//Create new assignment 
async function createAssignment(req, res){
    try{
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
            return res.status(400).json({ error: "Invalid due date" });
        }

        const newAssignment = new Assignment({
            courseId,
            title,
            dueDate: due,
            points
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
        const { id: courseId,assignmentId } = req. params;
        const updates = req.body;

        // validate dueDate if present
        if (updates.dueDate) {
            const due = new Date(updates.dueDate);
            if (isNaN(due.getTime()) || due < new Date()) {
                return res.status(400).json({ message: 'Invalid due date' });
            }
            updates.dueDate = due;
        }

        const assignment = await Assignment.findOneAndUpdate(
            { _id: assignmentId, courseId: courseId },
            updates,
            { new: true }
        );
        if(!assignment){
            return res.status(404).json("Assignment not found for the specific course");
        }

        res.status(200).json(assignment);

    } catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed to update assignment', message: err.message });
    }
}

async function getAssignment(req, res) {
    try{
        const { id: courseId } = req.params;
        const { skip = 0, limit = 10, sort = 'createdAt', order = 'asc' } = req.query;

        const course = await Courses.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const assignments = await Assignment.find({ courseId })
            .skip(Number(skip))
            .limit(Number(limit))
            .sort({ [sort]: order === 'asc' ? 1 : -1 });

        const totalAssignments = await Assignment.countDocuments({ courseId });

        res.json({
            skip: Number(skip),
            limit: Number(limit),
            totalAssignments,
            totalPages: Math.ceil(totalAssignments / limit),
            sort,
            order,
            data: assignments
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed to get assignments', message: err.message });
    }  
}

// DELETE 
async function deleteAssignment(req, res){
    try{
        const { courseId, assignmentId } = req.params;

        const assignment = await Assignment.findOne({ _id: assignmentId, courseId });
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        await assignment.deleteOne();
        res.json({ message: 'Assignment deleted successfully' });

    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Failed to delete assignment', message: err.message });
    }
}

module.exports = { createAssignment, updateAssignment, getAssignment, deleteAssignment };