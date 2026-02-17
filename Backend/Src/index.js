import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { connectDB } from "./Lib/db.js";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import { app, server } from "./Lib/socket.js";

import path from "path";

dotenv.config();

const PORT = process.env.PORT;

const __dirname = path.resolve();

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

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("/.*/", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
};

server.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
    connectDB();
});
