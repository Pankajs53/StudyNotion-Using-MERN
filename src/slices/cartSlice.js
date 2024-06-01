import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in cart");
        return;
      }

        //if course not in cart then add
        
        state.cart.push(course)
        state.totalItems++;
        state.total+=course.price;

        // now update local storage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Course added to cart")
    },
    removeFromCart(state, action) {
        const courseId = action.payload
        const index = state.cart.findIndex((item)=>item._id===courseId)

        if(index>=0){
            // course found in cart
            state.totalItems--;
            state.total-=state.cart[index].price
            state.cart.splice(index,1)

            // update local storgae
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course removed from cart")
        }
    },
    resetCart(state) {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")

      toast.success("Reset Card Done")
    },
    
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
