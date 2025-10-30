import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Types.ObjectId },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {versionKey: false});

const user = mongoose.model("users", userSchema);

export default user;
