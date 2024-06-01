const Section = require("../models/Section");
const Courses = require("../models/Course");
const Course = require("../models/Course");

// create section
exports.createSection = async(req,res) =>{
    try{
        // fetch the data
        const {sectionName, courseID} = req.body;
        // data validation
        if(!sectionName || !courseID){
            return res.status(500).json({
                success:false,
                message:"ALL FIELDS REQUIRED"
            })
        }
        // create a section
        const newSection = await Section.create({
            sectionName
        });

        // update the _id and course schema
        const updatedCourse = await Course.findByIdAndUpdate(
                                                                courseID,
                                                                {
                                                                    $push:{
                                                                        courseContent:newSection._id
                                                                    }
                                                                },
                                                                {new:true}
                                                            ).populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "subSection",
                                                                },
                                                            })
                                                            .exec();

       // TODO: How to use populate so we can show both section and subsection in the updatedCourse                                                     
        
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            data:updatedCourse,
        })                                                    
    }catch(error){
        console.log("ERROR IN SECTION CREATION ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN SECTION CREATION"
        })
    }
}

exports.updateSection = async(req,res) =>{
    try{
        // data
        const {sectionName, sectionId} = req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(500).json({
                success:false,
                message:"ALL FIELDS REQUIRED"
            })
        }
        // update the data
        const updatedSection = await Section.findByIdAndUpdate(
                                                        sectionId,
                                                        {sectionName},
                                                        {new:true}
                                                    );
        
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            // data:updatedSection,
        })                                                  
    }catch(error){
        console.log("ERROR IN update Section  ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN update Section "
        })
    }
}

exports.deleteSection = async(req,res) =>{
    try{
        // section ID -> Assuming that we are sending ID in params
        const {sectionId} = req.params;
        if(!sectionId){
            return res.status(500).json({
                success:false,
                message:"ALL FIELDS REQUIRED"
            })
        }
        
        // delete sectiom
        await Section.findByIdAndDelete(sectionId);
        // TODO: DO WE NEED TO DELETE THE ENTRY FROM COURSE SCHEMA
        // return response
        return res.status(200).json({
            success:true,
            message:"SECETION DELETED SUCCESSFULLY",
        })
    }catch(error){
        console.log("ERROR IN DELETING THE SECTION-> ", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN DELETING THE Section "
        })
    }
}