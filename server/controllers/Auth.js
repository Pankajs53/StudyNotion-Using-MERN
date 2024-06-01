const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bycrpt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");

// send OTP
exports.sendOTP = async(req,res) => {
    console.log("INSIDE SENDOTP FUNCTIOn")
    try{
        console.log("INSIDE SENDOTP FUNCTIOn")
        const {email} = req.body;
        console.log("EMAIL TO SEND OTP IS->",email);
        // check if user already present
        const checkUserPresent = await OTP.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("OTP generatred -> ",otp);
        // make sure otp is unique -> we have to check in existing db
        let result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        // make entry of otp in db
        const otpPayLoad = {email,otp};
        const otpBody = await OTP.create(otpPayLoad);
        console.log("OTP BODY IS->",otpBody);
        return res.status(200).json({
            success:true,
            message:"OTP SEND SUCCESFULLY",
            otp,
        })


    }catch(error){
        console.log("SOME ERROR IN SEND OTP FUNCTION ->",error);
        return res.status(401).json({
            success:false,
            message:"ERROR IN OTP SEND FUNCTION"
        })
    }
};



// sign up
exports.signUp = async(req,res) => {
    try{
        // fetch the data from body
        const {firstName, lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;
        console.log(otp);
        // validate the data
        if(!firstName || !lastName || !email || !password || !confirmPassword ||
            !otp ){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                })
        }
        
        // match the both password
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confrimPassword value does not match"
            })
        }
        // check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Registered",
            })
        }
        console.log(existingUser);

        // find most recent otp for the user
        const recentOTP = await OTP.find({email:email}).sort({createAt:-1}).limit(1);
        console.log("Most recent otp->",recentOTP[0].otp);

        console.log("sned otp->",otp);
        console.log("DB OTP->",recentOTP[0].otp);
        // validate the otp 
        if(recentOTP.length==0){
            // otp not found
            return res.status(400).json({
                success:false,
                message:"OTP Not found"
            })
            
        }else if(otp!==recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:"OTP does not match"
            })
        }

        // hash the password
        const hashedPassword = await bycrpt.hash(password,10); 
        console.log(hashedPassword);
        // creaate an entry in db
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender:"",
            dateofBirth:"",
            about:"",
            contactNumber:"",
        });

        console.log("Profile Details->",profileDetails);


        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType:accountType,
            approved: approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        console.log("User is->",user);

        return res.status(200).json({
            success:true,
            message:"SIGN UP SUCCESSFULLY -> USER REGISTERED",
            user,
        })
    }catch(error){
        console.log("ERROR IN SIGN UP->",error);
        return res.status(405).json({
            success:false,
            message:"ERROR IN SIGN UP",
        })
    }
}


// login 
exports.login = async(req,res) =>{
    try{
        console.log("Inside login controller");
        const {email,password} = req.body;
        console.log("email is",email,"password is->",password);
        // check if email or password is empty
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"ENTER DATA CAREFULLY"
            })
        }

        // check if present in DB
        const userExist = await User.findOne({email}).populate("additionalDetails");
        console.log(userExist);
        if(!userExist){
            return res.status(405).json({
                success:false,
                message:"User does not exits,plase sign up first"
            })
        }

        // compare the password
        if(await bycrpt.compare(password,userExist.password)){
            // create a jwt toke
            const payload = {
                email : userExist.email,
                id:userExist._id,
                accountType:userExist.accountType,
            }
            console.log("Payload is",payload);
            const token = jwt.sign(payload,process.env.JWT_SECRET , {
                expiresIn:"2h",
            });

            // Save token to user document in database
            userExist.token = token;
            userExist.password = undefined;

            const options = {
                // 3 days
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                userExist,
                message:"Logged In Succesfully"
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }catch(error){
        console.log("ERROR IN LOGIN ->",error);
        return res.status(405).json({
            success:false,
            message:"ERROR IN LOGIN UP",
        }) 
    }
}


// TODO: changePassword
exports.changePassword = async (req,res) =>{
    try{
        // Get user data from req.user
		const userDetails = await User.findById(req.user.id);
        // get data from req body
        const{oldPassword, newPassword,confirmPassword} = req.body;

        // validation
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"ENTER ALL REQUIRED DATA CAREFULLY",
            })
        }
        
        // check the oldPassword in db -> get the email from token -> use Auth Middelware 
        const user = await User.findOne({email:req.user.email});
        if(await bycrpt.compare(oldPassword,user.password)){
            // compare thew new two password
            if(newPassword!==confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Plase enter same Password for newPass and ConfrimPass"
                })
            }else{
                // both pass are same then hash and  update new password in db
                const hashedPassword = await bycrpt.hash(newPassword,10);
                // update password in DB
                const userId = req.user._id;
                const newUser = await User.findByIdAndUpdate(userId,{password:hashedPassword},{new:true});
                // send a mail when password is updated
                try{
                    await mailSender(req.user.email,"Password Changes succesfully","");
                    console.log("EMAIL SEND FOR PASSWORD CHNAGES SUCCESFULLY")
                }catch(error){
                    console.log("ERROR IN SENDING EMAIL FOR PASSWORD",error)
                }
                //return response 
                return res.status(200).json({
                    success:true,
                    message:"Password Updated Succesfully",
                    data:newUser
                })
            }

        }else{
            return res.status(502).json({
                success:false,
                message:"Current passowrd is not correct",
            });
        }    
    }catch(error){
        console.log("ERROR IN CHANGINGPASSWORD ->",error);
        return res.status(405).json({
            success:false,
            message:"ERROR IN CHANGINGPASSWORD",
        }) 
    }
}