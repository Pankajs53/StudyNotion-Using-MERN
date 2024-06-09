import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
        {
          contactDetails.map((ele,index)=>{
            let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
            return <div className="flex flex-row gap-4" key={index}>
                <div>
                  <Icon size={25}/>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-richblack-100">{ele.heading}</h1>
                  <p className="text-richblack-400 font-medium">{ele.description}</p>
                  <p className="text-richblack-400 font-semibold">{ele.details}</p>
                </div>
            </div>
          })
        }
    </div>
  )
}

export default ContactDetails
