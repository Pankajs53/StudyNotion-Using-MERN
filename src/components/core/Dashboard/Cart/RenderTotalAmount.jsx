import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state)=>state.cart)

    const handleBuyCourse = () =>{
        const courses = cart.map((course)=>course._id)
        console.log("Payment Gateway not ready",courses)
        // todo -> api intergation for payment gateway
    }

  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>



        <button className='bg-yellow-100 py-2 px-3 w-full justify-center' onClick={()=>handleBuyCourse()}>
            Buy Now
        </button>
    </div>
  )
}

export default RenderTotalAmount