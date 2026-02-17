import cloudinary from "../Lib/cloudinary.js";
import { getReceiverSocketId, io } from "../Lib/socket.js";
import Message from "../Models/message.model.js";
import User from "../Models/user.model.js";
export const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async(req,res) => {
    try {
        const { id:userToChatId } = req.params
        const MyId = req.user._id;

        const message = await Message.find({
            $or:[
                {senderId:MyId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:MyId}
            ]
        })

    res.status(200).json(message)
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async(req,res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.error("Error in sendMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}