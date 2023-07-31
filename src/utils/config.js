import dotenv from 'dotenv';

dotenv.config();

const config = {
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_ADDRESS,
    password: process.env.MAIL_PASSWORD,
    fromAddress: process.env.MAIL_FROM_ADDRESS,
  },
};

export default config;
