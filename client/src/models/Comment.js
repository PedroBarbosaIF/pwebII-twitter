import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        text: { type: String, required: true},
        postID: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    },
    { versionKey: false }
);

const comment = mongoose.model("comments", commentSchema);

export default comment;
