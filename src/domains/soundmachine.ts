import { logger } from '../logger/logger';
import Button from '../models/Button';
import soundRepo from '../repository/sound.repo';
import playerService from '../services/player.service';

const log = logger.child({ name: 'SoundMachine.ts' });

export default {
  async getButtons(): Promise<Button[]> {
    return soundRepo.getButtons();
  },

  async updateButton(id: number, sound: { name: string, data: Buffer }): Promise<Button> {
    return await soundRepo.updateButton(id, sound.name, sound.data);
  },

  async playButtonSound(id: number) {
    const button = await soundRepo.getButton(id);

    if (!button) {
      log.warn(`No sound config for button ${id}`);
    }

    playerService.play(button.path);
  },
}
