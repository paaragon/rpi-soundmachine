import { exec } from 'child_process';
import { logger } from '../logger/logger';

const log = logger.child({ name: 'player.service.ts' });

let soundIsPlaying = false;

export default {
  async play(path: string): Promise<void> {
    return new Promise((res, rej) => {
      if (soundIsPlaying) {
        res();
        return;
      }
      soundIsPlaying = true;
      const command = `vlc ${path} vlc://quit`;
      log.info(command);
      exec(command, (error, stdout, stderr) => {
        soundIsPlaying = false;
        res();
      });
    });
  },
}
