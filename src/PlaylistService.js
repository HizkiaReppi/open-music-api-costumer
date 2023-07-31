import pg from 'pg';

const { Pool } = pg;

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const { rows } = await this._pool.query(query);

    return rows[0];
  }

  async getSongs(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer
      FROM songs s
      INNER JOIN songs_playlist p
      ON p.song_id = s.id
      WHERE p.playlist_id = $1`,
      values: [playlistId],
    };
    const { rows } = await this._pool.query(query);

    return rows;
  }

  async getPlaylistOwner(playlistId) {
    const query = {
      text: `SELECT users.username, users.fullname
      FROM users
      INNER JOIN playlists
      ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const { rows } = await this._pool.query(query);

    return rows[0];
  }
}

export default PlaylistsService;
