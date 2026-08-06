import User from "../models/user.model.js";
import Profile from '../models/profile.model.js';
import Post from '../models/posts.model.js';


import bcrypt from 'bcrypt';


export const activeCheck = async(req, res) => 
{
    return res.status(200).json({message: "Running"});
}

export const createPost = async (req, res) => {
    const { token } = req.body;

    try {

        const user = await User.findOne({token: token});

        if(!user){
            return res.status(404).json({ message: "User not found"});
        }

        const post = new Post({
            userId: user._id,
            body: req.body.body,
            media: req.file != undefined ? req.file.filename : "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
        });

        await post.save();

        return res.status(200).json({ message: "Post created"});

    } catch(err){
        return res.status(500).json({message: err.message});
    }
}



export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name username email profilePicture');
        return res.json({ message: "Posts retrieved successfully", posts });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const deletePost = async (req, res) => {

    const { token, postId } = req.body;

    try {
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   

        const post = await Post.findOne({ _id: postId, userId: user._id });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        await post.remove();
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
