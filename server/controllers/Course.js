const Course = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const category = require("../models/category");
require("dotenv").config();
const RatingAndReview = require("../models/RatingAndReview")


// Function to create a new course
exports.createCourse = async(req,res) =>{
    try{
        // Get user ID from request object
		const userId = req.user.id;
        // fetch data
        let {courseName, courseDescription,whatYouWillLearn,price,category,status,instructions}=req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        // get instructor details
        const instructorDetails = await User.findById(userId, {accountType:"Instructor"});
        console.log("INSTRUCTOR DETAILS -> ",instructorDetails);

        // TODO:VErify that user id and instructor details._id are same or different

        if(!instructorDetails){
            return res.status(404).json({

                success:false,
                message:"Instructor Details Not found",
            })
        }

        // check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({

                success:false,
                message:"category Details Not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        console.log(thumbnail);
        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatWillYourLearn:whatYouWillLearn,
            price,
            // tag:tagDetails._id,
            thumbNail:thumbnailImage.secure_url,
            status: status,
			instructions: instructions,
        })

        // add the new course to user instructor schema
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        // TODO:update the tag schema
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                    course:newCourse._id,
                }
            },
            {new:true},
        )

        // return response

        return res.status(200).json({
            success:true,
            message:"New course created succesfully",
            data:newCourse,
        })


    }catch(error){
        console.log("ERROR IN creating Course ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN Create Course"
        })
    }
}

// get All course
exports.showAllCourse = async(req,res) =>{
    try{
        // TODO
        const allCourses = await Course.find(
            {},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
            ).populate("instructor")
            .exec();

        return res.status(200).json({
            success:true,
            message:"ALL COURSES DATA FETCHED",
            data:allCourses,
        })                                        

    }catch(error){
        console.log("ERROR IN FETCHING ALL COURSES DATA ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN FETCHING ALL COURSES DATA"
        })
    }
}

// get course details
exports.getCourseDetails = async(req,res) =>{
    try{
        const {courseId} = req.body;
        console.log(courseId);
        // find course details
        const courseDetails = await Course.find(
                                            {_id:courseId})
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    },
                                                }
                                            )
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                },
                                            })
                                            .exec();

       //vlaidation
       if(!courseDetails){
            return res.status( 400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            })
       }      
       
       return res.status(200).json({
        success:true,
        message:"Course Details Fetched",
        data:courseDetails,
       })
    }catch(error){
        console.log("ERROR IN GETTING COURSE DETAILS->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN GETTING COURSE DETAILS"
        })
    }
}