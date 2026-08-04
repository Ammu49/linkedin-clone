import mongoose from 'mongoose';


const CommentsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        body: {
            type: String,
            required: true
        }
    }
);

const Comment = mongoose.model('Comment', CommentsSchema);

export default Comment;