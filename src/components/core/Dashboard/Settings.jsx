import React from 'react'
import { useSelector } from 'react-redux'

const Settings = () => {

  const {user} = useSelector((state)=>state.profile)

  return (
    <div className='flex flex-col gap-3 text-white'>

      {/* section 1 */}
      <div className='p-10 border-richblack-700 bg-richblack-800 rounded-md'>
        <div className='flex flex-row items-center gap-x-3'>
          {/* img */}
          <img
             src={user?.image}
             alt={`profile-${user?.firstName}`}
             className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div className='flex flex-col gap-3'>
              <p>Change Profile Picture</p>
              <div>
                {/* select */}

                <button>
                  <p>Upload</p>
                  {/* upload icon */}
                </button>
              </div>
          </div>
        </div>
      </div>

      {/* section 2 */}


      {/* section 3 */}


      {/* section 4 */}

    </div>
  )
}

export default Settings