import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getAboutUser, getAllUsers } from '../../action/authAction/index.js'



const initialState = {
    user: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequests: [],
    all_users: [],
    all_profiles_fetched: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleloginUser: (state) => {
            state.message = "Hello"
        },
        emptyMessage: (state) => {  
            state.message = "";
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true;
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false;
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
        .addCase(getAboutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.profileFetched = true;
            state.user = action.payload;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.all_users = action.payload.profiles;
            state.all_profiles_fetched = true;
        })
    }
})

export const { reset, handleloginUser, emptyMessage, setTokenIsThere, setTokenIsNotThere } = authSlice.actions;

export default authSlice.reducer;