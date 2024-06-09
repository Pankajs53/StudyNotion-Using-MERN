import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {

    const {totalItems,total} = useSelector((state)=>state.cart)

  return (
    <div className='text-white'>
        <h1>Your Cart</h1>
        <p>{totalItems} Course in Cart</p>

        {total>0
        ?(<div>
            <RenderCartCourses/>
            <RenderTotalAmount/>

        </div>)
        :(<div>
            Your Cart Is Empty
        </div>)}
    </div>
  )
}

export default Cart