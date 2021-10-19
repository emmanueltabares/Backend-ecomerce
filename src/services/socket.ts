import { Server } from 'socket.io';
import { addMessage, getAllMessages } from '../models/messages';

export const initWsServer = (server: any) => {

    const io = new Server(server);

    io.on('connection', async (socket: any) => {
        console.log('Llegó una conexión');

        let messages = await getAllMessages();
        socket.emit('receiveMessage', messages)

        socket.on('newMessage', (message: any) => {
            console.log('Llegó un  mensaje');
            addMessage(message);
            io.emit('newMessage', message);
        })
    })

    return io;
}