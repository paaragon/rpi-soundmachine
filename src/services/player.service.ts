import { exec } from 'child_process';

export default {
  async play(path: string): Promise<void> {
    return new Promise((res, rej) => {
      exec(`vlc --alsa-audio-device hw:1,0 ${path}`, (error, stdout, stderr) => {
        if (error || stderr) {
          rej(error);
          return;
        }
        res();
      });
    });
  },
}
