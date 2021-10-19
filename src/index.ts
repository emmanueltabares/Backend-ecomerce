import { connectToDB } from './services/db';
import Server from './services/server';
import { initWsServer } from './services/socket';

const port = process.env.PORT || 8080;

const init = async () => {
    try {
        await connectToDB();
        initWsServer(Server);
        Server.listen(port, () => console.log(`Server up in port ${port}`));
    } catch (error) {
        console.log('Error: ', error)
    }
}

init();