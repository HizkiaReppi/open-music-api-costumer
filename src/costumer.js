import amqp from 'amqplib';
import config from './utils/config.js';
import logger from './utils/logging.js';

const init = async () => {
  const connection = await amqp.connect(config.rabbitMq.server);

  const channel = await connection.createChannel();

  logger.info('Consumer berjalan');
};

init();
