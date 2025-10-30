import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        title: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        text: { type: String },
    },
    { versionKey: false }
);

const post = mongoose.model("posts", postSchema);

export default post;
