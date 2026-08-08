import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from '../../action/authAction/index.js'



const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    profileFetched: false,
    connections: [],
    connectionRequests: [],
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleloginUser: (state) => {
            state.message = "Hello"
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Loading..."
        })
        .addCase(loginUser.fulfilled, (state, action) => {  
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = {
                message: "Login Successful"
            };
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Registering you..."
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = {
                message: "Registration Successful, Please login to continue"
            };
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
    }
})

export default authSlice.reducer;