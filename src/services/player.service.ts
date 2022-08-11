import Player from 'play-sound';

export default {
  async play(path: string): Promise<void> {
    return new Promise((res, rej) => {
      const player = Player();
      player.play(path, (err) => {
        if (err) {
          return rej(err);
        }
        res();
      });
    });
  },
}
