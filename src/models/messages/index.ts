import { messageModel } from "./messagesSchema";
import { normalize, schema } from 'normalizr';

const author = new schema.Entity('author', {}, { idAttribute: 'email'});

const msg = new schema.Entity(
    'message', 
    {
        author: author,
    },
    { idAttribute: '_id'}
);

const messageSchema = new schema.Array(msg);

export const getAllMessages = async () => {
    try {
        let messages = (await messageModel.find()).map((aMsg: any) => ({
            _id: aMsg._id,
            author: aMsg.author,
            text: aMsg.text,
        }));

        let normalizedMessages = normalize(messages, messageSchema)

        return normalizedMessages;
    } catch(err) {
        console.log('Error: ', err);
    }
};

export const addMessage = async (msg: any) => {
    let messageToSave = new messageModel(msg);
    let savedMessage = await messageToSave.save()
    return savedMessage;
}