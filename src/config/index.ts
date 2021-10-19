import dotenv from 'dotenv';

dotenv.config()

export default {
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER,
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD,
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER,
    MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB,

    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
  };