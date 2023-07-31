import logger from './utils/logging.js';

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString(),
      );
      const playlistsData = await this._playlistsService.getPlaylists(
        playlistId,
      );
      const songs = await this._playlistsService.getSongs(playlistId);
      const owner = await this._playlistsService.getPlaylistOwner(playlistId);
      await this._mailSender.sendEmail(
        targetEmail,
        owner,
        JSON.stringify({
          playlist: {
            id: playlistsData.id,
            name: playlistsData.name,
            songs,
          },
        }),
      );

      logger.info(`Email dikirim ke ${targetEmail}`);
    } catch (error) {
      logger.error(error);
    }
  }
}

export default Listener;
