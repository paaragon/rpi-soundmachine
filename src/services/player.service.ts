import Sound from 'node-aplay';

export default {
  async play(path: string): Promise<void> {
    return new Promise((res, rej) => {
      const music = new Sound(path);
      music.play();
      music.on('complete', () => {
        res();
      });
    });
  },
}
