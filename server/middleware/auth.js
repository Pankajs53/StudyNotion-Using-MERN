// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};


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