import mongoose from 'mongoose';


const connectionRequest = new mongoose.Schema (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        connectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status_accepted: {
            tupe: Boolean,
            default: null
        }
    }
);

const ConnectionRequest = mongoose.model("ConnectionRequest", ConnectionRequest);

export default ConnectionRequest;