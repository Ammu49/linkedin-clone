import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction";


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

const postSlice = createSlice(
    {
        name: "post",
        initialState,
        reducers: {
            reset: () => initialState,
            resetPostId: (state) => {
                state.postId = ""
            },
        },

        extraReducers: (builder) => {
            builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all the posts..."
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.profileFetched = true;
                state.posts = action.payload.posts
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
        }
    }
)

export default postSlice.reducer;