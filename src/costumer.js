import amqp from 'amqplib';
import PlaylistsService from './PlaylistService.js';
import config from './utils/config.js';
import logger from './utils/logging.js';

const init = async () => {
  const playlistsService = new PlaylistsService();
  const connection = await amqp.connect(config.rabbitMq.server);

  const channel = await connection.createChannel();
  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  logger.info('Consumer berjalan');
};

init();
