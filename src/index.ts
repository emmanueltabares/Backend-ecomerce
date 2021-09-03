import Server from './services/server';
import { DBService } from './services/db';

const port = 8080;

DBService.init()
Server.listen(port, () => console.log(`Server up in port ${port}`));