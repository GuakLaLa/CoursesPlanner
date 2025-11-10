const SyllabusVersion = require('../models/syllabusVersion');

//Create new syllabus version
async function createSyllabusVersion(req, res){
    try{
        const { id: courseId } = req.params;
        const{ notes } = req.body;

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
            isCurrent: true
        });

        res.status(201).json(newSyllabusVersion);

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

//Update syllabus version (optimistic locking)
async function updateSyllabusVersion(req, res){
    try{
        const { id: courseId } = req.params;
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
        const { id: courseId } = req.params;

        const currentVersion = await SyllabusVersion.findOne({ courseId, isCurrent: true });
        if(!currentVersion){
            return res.status(404).send("No current syllabus version yet");
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
        const { id: courseId } = req.params;
        const { page = 1, pageSize = 10 } = req.query;
        const skip = (page - 1) * pageSize;

        const syllabusVersions = await SyllabusVersion.find({ courseId })
            .sort({ version: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(pageSize));

        res.status(200).json(syllabusVersions);

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

module.exports = { createSyllabusVersion, getCurrentSyllabusVersion, getAllSyllabusVersions, updateSyllabusVersion };