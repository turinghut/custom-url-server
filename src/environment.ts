import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  WEB_HOST: process.env.WEB_HOST,
  API_HOST: process.env.API_HOST,
  PORT: process.env.PORT,
};
