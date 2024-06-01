const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { Mongoose } = require("mongoose");

exports.createRating = async (req,res) =>{
    try{
        // get user id
        const userId = req.user.id;
        // fetch data from req body
        const {rating,review,courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                     studentEnrolled:{$elemMatch:{$eq:userId}},
                                    });
        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message:"NOT ENROLLED FOR THIS COURSE",
            })
        }
        // check if user has already given review
        const alreadyReviewd = await RatingAndReview.findOne({
                                    user:userId,
                                    course:courseId
        });

        if(alreadyReviewd){
            return res.status(500).json({
                success:false,
                message:"ALREADY REVIEWD",
            })
        }
        // creating rating and review
        const ratingReview = await RatingAndReview.create({
                                rating,review,
                                course:courseId,
                                user:userId,
        })
        // update course with rating/review
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},
                                        {
                                            $push:{
                                                ratingAndReviews:ratingReview._id,
                                            }
                                        },
                                        {new:true});

        console.log(updatedCourseDetails);
        // return response
        return res.status(200).json({
            success:true,
            message:"RATING AND REVIEW CREATED",
            Data:ratingReview
        })
    }catch(error){
        console.log("ERROR IN RATING AND REVIEW->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN RATING AND REVIEW CREATION"
        })
    }
}

exports.getAverageRating = async (req,res) =>{
    try{
        // get course id
        const courseId = req.body.courseid;
        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new Mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])


        if(result.length>0){
            return res.status(200).json({
                sucess:true,
                averageRating:result[0].averageRating
            })
        }
        // return
        return res.status(200).json({
            success:true,
            message:"Average rating is ), no rating given till now",
            averageRating:0,
        })

    }catch(error){
        console.log("ERROR IN getting average rating for course->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN getting average rating for course"
        })
    }
}

// get all rating and reviews
exports.allRatingAndReview = async(req,res) =>{
    try{
        const allRatingAndReview = await RatingAndReview.find({})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image"
                                    })  
                                    .populate({
                                        path:"course",
                                        select:"courseName",
                                    }) 
                                    .exec();             
    
        if(!allRatingAndReview){
            return res.status(400).json({
                success:false,
                message:"No RATING AND REVIEW AVAILABLE"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Received all rating and reviews",
            data:allRatingAndReview,
        })
    }catch(error){
        console.log("ERROR IN Getting RATING AND REVIEW->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN GETTING RATING AND REVIEW "
        })
    }
}