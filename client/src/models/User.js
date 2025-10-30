import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {type: mongoose.Types.ObjectId},
    username: {type: String},
    password: {type: String}
})

const user = mongoose.model('users', userSchema);

export default user;