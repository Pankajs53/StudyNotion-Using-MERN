const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bycrpt = require("bcrypt")
const crypto = require("crypto");

// resetPasswordToekn -> generates a link on email through which we can open and change the password
exports.resetPasswordToken = async (req,res) => {
    try{
        console.log("Inside resetPassword Token");
        const email = req.body.email;
        console.log("received email is->",email)
        const user = await User.findOne({email:email});
        console.log("User is->",user);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user does not exits"
            })
        }
        // create a token
        const token = crypto.randomBytes(20).toString("hex");
        console.log("Token is->",token);
        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires:Date.now() + 5*60*1000,
                                            },
                                            {new:true});
        // create url
        console.log("DETAILS", updatedDetails);
        const url = `http://localhost:3000/update-password/${token}`
        // send mail containing url
        await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);
        return res.status(200).json({
            success:true,
            message:"Email Send successfull, plase check email and change password"
        })
    }catch(error){
        console.log("ERROR IN SENDING THE TOKEN TO RESET PASSWORD ->", error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN SENDING THE TOKEN TO RESET PASSWORD"
        })
    }
}

// resetPassword -> update the password
exports.resetPassword = async (req,res) => {
    try{
        // fetch the data
        const {password,confirmPassword, token} = req.body;
        // validation
        if(password!=confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching",
            })
        }
        // get user details from db using token
        const userDetails = await User.findOne({token:token});
        // if no entry -> invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        // check time of token
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate new token"
            })
        }
        // hash the password and update the password
        const hashedPassword = await bycrpt.hash(password,10);
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
        // return response
        return res.status(200).json({
            success:true,
            message:"Password Reset Succesfully",
        });
    }catch(error){
        console.log("ERROR IN resetPassword ->", error);
        return res.status(500).json({
            success:false,
            message:"resetPassword has some error"
        })
    }
}