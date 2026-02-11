import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./Lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, ()=> {
    console.log("Servers in running on Port: "+ PORT);
    connectDB();
});