import amqp from 'amqplib';
import PlaylistsService from './PlaylistService.js';
import MailSender from './MailSender.js';
import Listener from './Listener.js';
import config from './utils/config.js';
import logger from './utils/logging.js';

const init = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);
  const connection = await amqp.connect(config.rabbitMq.server);

  const channel = await connection.createChannel();
  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });

  logger.info('Consumer berjalan');
};

init();
