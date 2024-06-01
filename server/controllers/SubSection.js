const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
require("dotenv").config();


exports.createSubSection = async(req,res) =>{
    try{
        // fetch data from req.body
        const {sectionId, title,timeDuration, description} = req.body;
        // extract file/vidoe
        const video = req.files.video;
        //validation
        if(!sectionId ||!title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        console.log(video)
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // create sub section
        const newSubSection = await SubSection.create({
            title:title,
            description:description,
            timeDuration:`${uploadDetails.duration}`,
            videoUrl:uploadDetails.secure_url,
        })
        //update subsection id and section DB
        const updatedSection= await Section.findByIdAndUpdate(sectionId,{$push:{subSection:newSubSection._id}},{new:true}).populate("subSection");

        // TOOD:LOG UPDATED SECTION HERE AFTER POPULARE QUERY
        return res.status(200).json({
            success:true,
            message:"SUB SECTION CREATED ",
            data:updatedSection,
        })
    }catch(error){
        console.log("ERROR IN Creating Sub Section  ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN Creating Sub Section "
        })
    }
}

exports.updateSubSection = async(req,res) =>{
    try{
        const { sectionId, title, description } = req.body
        const subSection = await SubSection.findById(sectionId)
    
        if (!subSection) {
            return res.status(404).json({
            success: false,
            message: "SubSection not found",
            })
        }
    
        if (title !== undefined) {
            subSection.title = title
        }
    
        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
    
        await subSection.save()
    
        return res.json({
            success: true,
            message: "Section updated successfully",
        })
    }catch(error){
        console.log("ERROR IN UPDATING Sub Section  ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN UPDATING Sub Section "
        })
    }
}


exports.deleteSubSection = async(req,res) =>{
    try{
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
      })
    }catch(error){
        console.log("ERROR IN DELETING Sub Section  ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN DELETING Sub Section "
        })
    }
}