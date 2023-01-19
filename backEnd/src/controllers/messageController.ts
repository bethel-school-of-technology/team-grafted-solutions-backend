import { RequestHandler } from "express";
import { Message } from "../models/message";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllMessages: RequestHandler = async (req, res, next) => {
    let messages = await Message.findAll();
    res.status(200).json(messages);
}

export const getOneMessage: RequestHandler = async (req, res, next) => {
    let messageId = req.params.messageId;
    let message = await Message.findByPk(messageId);
    res.status(200).json(message);
}

export const createMessage: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req, res, next);

    if (!user) {
        return res.status(403).send('User not detected.');
    }

    let newMessage: Message = req.body;
    
}