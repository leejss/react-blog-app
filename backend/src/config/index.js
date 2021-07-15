import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT,
  mongoUriLocal: process.env.MONGO_URI_LOCAL,
  mongoUriCloud: process.env.MONGO_URI_CLOUD,
  jwtSecret: process.env.JWT_SECRET,
};

export default config;
