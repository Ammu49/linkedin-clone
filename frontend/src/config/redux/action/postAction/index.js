import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";


export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async(_, thunkAPI) => {
        try{
            const response = await clientServer.get('/posts');

            return thunkAPI.fulfillWithValue(response.data);
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async(userData, thunkAPI) => {
        try {
            const  formData = new FormData();
            formData.append('token', localStorage.getItem('token'));
            formData.append('body', userData.body);
            formData.append('media', userData.file);

            const response =await clientServer.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.status === 200){
                return response.fulfillWithValue("Post Uploaded");
            }else {
                return response.rejectWithValue("Post not uploaded");
            }
        }catch(error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


export const deletepost = createAsyncThunk(
    "post/deletepost",
    async (postId, thunkAPI) => {
        try {
            const response = await clientServer.delete("/delete_post", {
                data: {token: localStorage.getItem("token"),
                post_id: postId}
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
);

export const incrementLike = createAsyncThunk(
    "post/incrementLike",

    async(post, thunkAPI) => {
        try{

            console.log("POST DATA:", post);
            console.log("POST ID:", post.post_id);

            const response = await clientServer.post("/increment_post_like", {
                post_id: post.post_id
            })

            return response.data;
        }catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
)


export const getAllComments = createAsyncThunk(
    "post/getAllComments", 
    async(postData, thunkAPI) => {
        try{
            const response = await clientServer.get("/get_comments", {
                params: {
                    post_id: postData.post_id
                }
            })

            return thunkAPI.fulfillWithValue({
                comments: response.data,
                post_id: postData.post_id
            })
        }catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
)


export const postComment = createAsyncThunk(
    "post/postComment",
    async(commentData, thunkAPI)=> {
        try{
            console.log({post_id: commentData.post_id, body: commentData.body});

            const response = await clientServer.post('/comment', {
                token: localStorage.getItem('token'),
                post_id: commentData.post_id,
                commentBody: commentData.body
            });
            return thunkAPI.fulfillWithValue(response.daat)
        }catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: error.message }
            );
        }
    }
)