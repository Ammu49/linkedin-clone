import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";


export const loginUser = createAsyncThunk(
    "user/login", 

    async (user, thunkAPI)=> {
        try{

            const response = await clientServer.post("/login", {
                email: user.email,
                password: user.password
            });

            if(response.data.token){
            localStorage.setItem("token", response.data.token);
            
            } else {
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkAPI.fulfillWithValue(response.data.token);


        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkAPI)=> {
        try{
            const response = await clientServer.post("/register", {
                username: user.username,
                name: user.name,
                email: user.email,
                password: user.password
            });
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async (_, thunkAPI) => {

        try {

            const token = localStorage.getItem("token");

            console.log("token in getAboutUser", token);

            const response = await clientServer.get('/get_user_and_profile', {
              params: {
                token: token
               }
                
            })

            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
    }
    } 
)


export const getAllUsers = createAsyncThunk(
    "/user/getAllUsers",
    async(_, thunkAPI) => {
        try {
            const response = await clientServer.get('/get_all_users');

            return thunkAPI.fulfillWithValue(response.data);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const sendConnectionRequest = createAsyncThunk(
    "user/sendConnectionRequest",
    async(user, thunkAPI)=>{
        try{
            const response = await clientServer.post("user/send_connection_request", {
                token: user.token,
                connectionId: user.connectionId
            })

            thunkAPI.dispatch(getConnectionRequest({ token: user.token}))

            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getConnectionRequest = createAsyncThunk(
    'user/getConnectionrequests',
    async(user, thunkAPI)=>{

        try{const response = await clientServer.get("/user/get_connection_request", {
                params:{
                    token: user.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getMyConnectionRequests = createAsyncThunk(
    "user/getMyConnectionrequests",
    async(user, thunkAPI)=>{
        try{
            const response = await clientServer.get("/user/user_connection_request", {
                params:{
                    token: user.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const AcceptConnection = createAsyncThunk(
    "user/getMyConnectionrequests",
    async(user, thunkAPI)=>{
        try{
            const response = await clientServer.post("/user/accept_connection_request", {
                params:{
                    token: user.token,
                    requestId: user.connectionId,
                    action_type: user.action
                }
            })
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)