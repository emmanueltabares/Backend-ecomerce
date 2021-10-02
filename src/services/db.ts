import mongoose from "mongoose";
import { messageCollection, messageModel, messageSchema } from "../models/messages/messagesSchema";

export const connectToDB = () => {

    const MONGODB_URI = 'mongodb://localhost:27017/ecommerce';
          
    mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;
       
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('connected to MongoDB!'); // si esta todo ok, imprime esto
    });
}


