import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from "../../../services/operations/profileAPI"
import ProgressBar from "@ramonak/react-progress-bar";


const EnrolledCourses = () => {


  const {token} = useSelector((state)=>state.auth)  

  const [enrolledCourses,setenrolledCourses]=useState([])
  
  const getEnrolledCourses = async() =>{
    try{
        const response = await getUserEnrolledCourses(token);
        console.log("Enrolled courses are",response)
        setenrolledCourses(response)
    }catch(error){
        console.log("Error in fetching enrolled coureses",error)
    }
  }

  useEffect(()=>{
        getEnrolledCourses();
  },[]);

  return (
    <div className='text-white'>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>
                Loading....
            </div>): !enrolledCourses.length ? (<p>You have not Enrolled in any course ye</p>)
            : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {/* cards */}
                    {
                        enrolledCourses.map((course,index)=>{
                            <div key={index}>
                                <div>
                                    <img src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.description}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    {/* progress bar */}
                                    <ProgressBar completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                     />
                                </div>
                            </div>
                        })
                    }
                </div>
            )
        }

        {/* midd tab */}
    </div>
  )
}

export default EnrolledCourses