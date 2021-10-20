import dotenv from 'dotenv';
import args from 'args';

dotenv.config()

const options = [
  {
    name: 'port',
    description: 'The port on which the app runs',
  },
  {
    name: 'faceId',
    description: 'Facebook app ID',
  },
  {
    name: 'faceSecret',
    description: 'Facebook app secret',
  },
  {
    name: 'mode',
    description: 'run in fork or cluster mode',
  },
  {
    name: 'run',
    description: 'forever or pm2',
  },
];

args.options(options);
const flags = args.parse(process.argv);

export default {
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER,
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD,
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER,
    MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB,

    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
  };