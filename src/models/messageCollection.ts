import Mongoose from "mongoose";

const messagesCollection = "message";

const messageSchema = new Mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  createat: { type: Date },
});

export const messages = Mongoose.model(messagesCollection, messageSchema);