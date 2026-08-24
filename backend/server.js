import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from './routes/user.routes.js';

dotenv.config({path: "../.env"});

const app = express();

app.use(cors());

app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);
app.use("/uploads", express.static("uploads"));
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
} catch(err){
    console.log("DB not connected");
}
    app.listen(process.env.PORT, () => {
        console.log("app is listening");
    })
}

start();