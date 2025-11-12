const SyllabusVersion = require('../models/syllabusVersion');
const Course = require('../models/course');

//Create new syllabus version
async function createSyllabusVersion(req, res){
    try{
        const { id: courseId } = req.params;
        const{ notes } = req.body;

        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).send("Coursenot found");
        }

        //Find the latest version
        const latestVersion = await SyllabusVersion.findOne({ courseId }).sort({ version: -1 });
        const newVersionNumber = latestVersion ? latestVersion.version +1 : 1;

        //mark old current = false
        await SyllabusVersion.updateMany(
            { courseId, isCurrent: true },
            { $set: { isCurrent: false }}
        );

        const newSyllabusVersion = await SyllabusVersion.create({
            courseId,
            version: newVersionNumber,
            notes,
            isCurrent: true,
            lockVersion: 0
        });

        await newSyllabusVersion.save();

        res.status(201).json(newSyllabusVersion);

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

//Update syllabus version (optimistic locking)
async function updateSyllabusVersion(req, res){
    try{
        const { id:courseId } = req.params;
        const { notes, lockVersion } = req.body;

        //Find current syllabus version
        const current = await SyllabusVersion.findOne({ courseId, isCurrent: true });
        if(!current){
            return res.status(404).send("No current syllabus version to update");
        }

        // optimistic locking check
        if(current.lockVersion !== lockVersion){
            return res.status(409).json({error: "Version conflict. Someone else has updated the syllabus version. Please reload and try again."});
        }

        //Update notes and increment lockVersion
        current.notes = notes || current.notes;
        current.lockVersion += 1;
        await current.save();

        res.status(200).json({message: "Syllabus version updated successfully", syllabusVersion: current});

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

//Get current syllabus version
async function getCurrentSyllabusVersion(req, res){
    try{
        const { id:courseId } = req.params;

        const currentVersion = await SyllabusVersion.findOne({ courseId, isCurrent: true });
        if(!currentVersion){
            return res.status(404).json({ message:'No current syllabus version yet'});
        }
        res.status(200).json(currentVersion)

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

//Get all syllabus versions
async function getAllSyllabusVersions(req, res){
    try{
        const { id:courseId } = req.params;
        let { skip = 0, limit = 10, sort = 'version', order = 'desc' } = req.query;

        skip = parseInt(skip);
        limit = parseInt(limit);

        const totalVersions = await SyllabusVersion.countDocuments({ courseId });
        const versions = await SyllabusVersion.find({ courseId })
            .skip(skip)
            .limit(limit)
            .sort({ [sort]: order === 'asc' ? 1 : -1 });

        res.json({
            skip,
            limit,
            totalVersions,
            totalPages: Math.ceil(totalVersions / limit),
            sort,
            order,
            data: versions
        });
        
    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

module.exports = { createSyllabusVersion, getCurrentSyllabusVersion, getAllSyllabusVersions, updateSyllabusVersion };