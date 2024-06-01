const { Mongoose } = require("mongoose");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


// capture the payment and initate the razorpay order
exports.capturePayment = async(req,res) =>{
    try{
        // get courseid and userid
        const {courseId} = req.body;
        const userId = req.user.id;
        // validation
        if(!courseId){
            return res.status(500).json({
                success:false,
                message:"Plesse provide valid course id"
            })
        }
        // valid course details
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course){
                return res.status(599).json({
                    success:false,
                    message:"Cloud not find the course"
                })
            }
            // check if user has already bought the course
            const uid = new Mongoose.Types.objectId(userId); 
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"User already exist in same Course"
                })
            }
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
        // order create
        const amount = course.price;
        const currency = "INR";

        var options = {
            amount:amount*100,
            currency:currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                COURSEID:courseId,
                USERID:userId,
            }
        }

        try{
            // intiate the payment using razorpya
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail: course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            })
        }catch(error){
            console.log("ERROR IN RARZORPAY ORDER CREATION-> ",error.message);
            return res.status(500).json({
                success:false,
                message:"NOt able to initate order"
            })
        }
        // return response 
    }catch(error){
        console.loh("ERROR IN CAPTURE PAYMENT METHOD-> ",error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN CAPTURE PAYMENT METHOD"
        })
    }
}

// verify signature
exports.verifySignature = async(req,res) =>{
        const webHookSecret = "123456";
        const signature = req.headers["x-razorpay-signature"];
        const shasum=crypto.createHmac("sha256",webHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature===digest){
            const {userid,courseid} = req.body.payload.payment.entity.notes;
            try{
                // fulfill the action
                const enrolledCourse = await Course.findOneAndUpdate(
                                                    {_id:courseid},
                                                    {$push:{studentEnrolled:userid}},
                                                    {new:true},  
                );
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"
                    })
                }

                console.log(enrolledCourse);
                // find the student
                const enrolledStudent=await User.findByIdAndUpdate(
                                                {_id:userid},
                                                {$push:{courses:courseid}},
                                                {new:true},
                )
                console.log(enrolledStudent);

                // send mail tempelate for confirmation
                const emailRespone = await mailSender(
                                            enrolledStudent.email,
                                            "CONGRAULATION FROM STUDY NOTION",
                                            "CONGO FOR NEW COURSE"
                )

                console.log(emailRespone);

                return res.status(200).json({
                    success:true,
                    message:"Payment Done Verfied Signature",
                })
                
            }catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message,
                });
            }
        }else{
            return res.status(400).json({
                success:false,
                message:'Invalid request',
            });
        }
    
}
