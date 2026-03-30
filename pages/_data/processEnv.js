import { config } from 'dotenv';

config();

export default {
  BASE_URL: process.env.BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};
