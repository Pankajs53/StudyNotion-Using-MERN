const User = require("../models/User");
const Profile = require("../models/Profile")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course")

// update the profile details
exports.updateProfile = async(req,res) =>{
    try{
        // get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        // fecth user id
        const id = req.user.id;
        // find and update
        const userDetails = await User.findById(id);
        const userProfileDetails =await Profile.findById(userDetails.additionalDetails); 
        // update
        userProfileDetails.dateofBirth=dateOfBirth;
        userProfileDetails.about=about;
        userProfileDetails.contactNumber=contactNumber;
        userProfileDetails.gender=gender;
       

        await userProfileDetails.save();
        // return res.
        
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            data:userProfileDetails,
        })
    }catch(error){
        console.log("ERROR IN updating profile ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN updating profile"
        })
    }
}


// delete account
// TODO: HOW CAN WE SCHEDULE A DELETE RESPONSE SO THAT PROFILE GET DELETED AFTER 5 DAYS AUTOMATICALLY
// SEARCH:CRON JOB
exports.deleteAccount = async(req,res) =>{
    try{
        const id = req.user.id;
        
        // get the profile id and delete profile and then delete the id
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(500).json({
                success:false,
                message:"USER NOT FOUND"
            })
        }
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        await User.findByIdAndDelete({_id:id});

        // TODO : DECREASE THE VALUE OF TOTAL STUDENTS ENROLLED

        return res.status(200).json({
            success:true,
            message:"USER SUCCESFULLY DELETED"
        })
    }catch(error){
        console.log("ERROR IN DELETING THE ACCOUNT ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN DELETING ACCOUNt"
        })
    }
}

exports.getAllUserDetails = async(req,res) =>{
    try{
        const id = req.user.id;
        // validate and get details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails);
        return res.status(200).json({
            success:true,
            message:"USER DATA FETCHED SUCCESSFULLY",
            data:userDetails,
        })
    }catch(error){
        console.log("ERROR IN getting all user details ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN getting all user details"
        })
    }
}


// user to update the profile picture of the user
exports.updateDisplayPicture = async (req, res) => {
    try {
      console.log("Inside backend function for updateProfilePicture")
      const displayPicture = req.files.displayPicture
      console.log("displayPictire->",displayPicture);
      const userId = req.user.id
      console.log("userid is->",userId);
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log("image is->",image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      console.log("ERROR IN UPDATING THE PHOTO->",error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      console.log("UserId is->",userId);
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      console.log("UserDetails are->",userDetails);
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(510).json({
        success: false,
        message: error.message,
      })
    }
};