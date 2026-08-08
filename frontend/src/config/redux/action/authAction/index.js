import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";


export const loginUser = createAsyncThunk(
    "user/login", 

    async (user, thunkAPI)=> {
        try{

            const resposne = await clientServer.post("/login", {
                email: user.email,
                password: user.password
            });

            if(response.data.token){
            localStorage.setItem("token", resposne.data.token);
            
            } else {
                return thunkAPI.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkAPI.fulfillWithValue(resposne.data.token);


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