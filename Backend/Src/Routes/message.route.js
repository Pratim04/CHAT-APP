import express from "express";
import { protectRoute } from "../Middleware/auth.protectRoute.js";
import { getUsersForSidebar, getMessages, sendMessages } from "../Controllers/message.controller.js"
const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessages);
export default router;
