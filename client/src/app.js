import express from "express"
import ConnectToDB from "./config/dbConnection.js";
import routes from "./routes/index.js";
import cors from 'cors'
const app = express()

app.use(cors());
routes(app);

const connection = await ConnectToDB();

connection.on("error", (error) => {
    console.error("Connection failed, error below: \n" + error);
});

connection.once("open", () => {
    console.log(`conection is on with mongoDB\n`);
});

export default app;