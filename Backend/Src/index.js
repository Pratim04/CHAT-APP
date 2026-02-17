import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { connectDB } from "./Lib/db.js";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import { app, server } from "./Lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
    connectDB();
});
