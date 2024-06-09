import React from 'react'
import { useSelector } from 'react-redux'
import {ACCOUNT_TYPE} from "../../../utils/constants"

const StudentRoute = ({children}) => {

  const {user} = useSelector((state)=>state.profile)  

  if(user && user.accountType===ACCOUNT_TYPE.STUDENT){
    return <div>
        {children}
    </div>
  }

  return <div>
    <p>Unauthorized Route</p>
  </div>
}

export default StudentRoute