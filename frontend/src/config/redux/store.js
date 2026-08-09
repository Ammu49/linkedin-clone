import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/reducer/authReducer/index.js"
import postReducer from "../redux/reducer/postReducer/index.js"

/*
*
* STEPS for State Management
* Submit Action
* Handle action in it's reducer
* Register Here -> Reducer
*
*/

export const  store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})