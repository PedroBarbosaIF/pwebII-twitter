import "dotenv/config";
import mongoose from "mongoose";

async function dbConnectToDB() {
    mongoose.connect(process.env.DB_CONNECTION_STRING)

    return mongoose.connection
}

export default dbConnectToDB;