const nodemailer = require("nodemailer");
require("dotenv").config();

// const mailSender = async (email,title,body) => {
//     try{
//         let transporter = nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             }
//         })


//         let info = await transporter.sendMail({
//             from: 'Pankaj Singh👻" <foo@example.com>', // sender address
//             to: `${email}`, // list of receivers
//             subject: `${title}`, // Subject line
//             html: `${body}`, // html body
//         })

//         console.log(info);
//         return info;
//     }
//     catch(error){
//         console.log(error.message);
//     }
// }

// module.exports = mailSender;


// const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    console.log("Inside mailSender ");
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })


            let info = await transporter.sendMail({
                from: 'StudyNotion || CodeHelp - by Babbar',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;