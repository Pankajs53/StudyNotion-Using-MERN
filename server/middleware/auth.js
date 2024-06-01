const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// auth
exports.auth = async(req,res,next) =>{
    try{
        // verify the json web token
        //-> extract the token from cookie
        console.log("BEFORE TOKEN EXTRACTION");
        const token = req.cookies.token 
                    || req.body.token
                    || req.header("Authorization").replace("Bearer ", "");

        console.log("Token is->",token)
        console.log("AFTER TOKEN EXTRACTION")
        
        
        // check if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"TOKEN MISSSING",
            });
        }

        // verify the token
        try{
            const decode =  jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error){
            return  res.status(401).json({
                success:false,
                message:"issue in verifying token // Token is invalid"
            })
        }
        next();
    }catch(error){
        console.log("SOME ERROR IN AUTH MIDDELWARE ->",error.message);
        return res.status(401).json({
            success:false,
            message:"ERROR IN IN AUTH MIDDELWARE"
        })
    }
}


// isStudent
exports.isStudent = async (req,res,next) =>{
    try{
        
        if(req.user.accountType!=="Student"){
            return res.status(402).json({
                success:false,
                message:"This is a protected route for Students only",
            })
        }
        next();
    }catch(error){
        console.log("SOME ERROR IN verifying the student Auth ->",error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN verifying the student Auth"
        })
    }
}

// isInstructor
exports.isInstructor = async (req,res,next) =>{
    try{
        
        if(req.user.accountType!=="Instructor"){
            return res.status(402).json({
                success:false,
                message:"Not An Student",
            })
        }
        next();
    }catch(error){
        console.log("SOME ERROR IN verifying the Instructor Auth ->",error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN verifying the Instructor Auth"
        })
    }
}

// isAdmin
exports.isAdmin = async (req,res,next) =>{
    try{
        console.log("Account Type is->",req.user.accountType);
        console.log(req.user);
        if(req.user.accountType!=="Admin"){
            return res.status(402).json({
                success:false,
                message:"Not An isAdmin",
            })
        }
        next();
    }catch(error){
        console.log("SOME ERROR IN verifying the Admin Auth ->",error);
        return res.status(500).json({
            success:false,
            message:"ERROR IN verifying the Admin Auth"
        })
    }
}