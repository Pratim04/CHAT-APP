import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./Lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// 🔥 1️⃣ CORS FIRST
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// 🔥 2️⃣ Body + Cookies (FIXED LIMIT)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// 🔥 2️⃣ Body + Cookies
app.use(express.json());
app.use(cookieParser());


// 🔥 3️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
    connectDB();
});
