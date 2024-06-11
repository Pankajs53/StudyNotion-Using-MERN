import React from 'react'
import { useSelector } from 'react-redux'
import {ACCOUNT_TYPE} from "../../../utils/constants"

const InstructorRoute = ({children}) => {
    
    const {user} = useSelector((state)=>state.profile)

    if(user && user.accountType===ACCOUNT_TYPE.INSTRUCTOR){
        return <div>
            {children}
        </div>
    }


    return <div className='text-4xl bg-richblack-100 h-screen text-center'>
        <p>Unauthorized Route</p>
    </div>


}

export default InstructorRoute