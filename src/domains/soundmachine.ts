import config from 'config';
import { ConfigButtonsI } from '../config';
import { logger } from '../logger/logger';
import Button from '../models/Button';
import ButtonInRepo from '../models/ButtonInRepo';
import soundRepo from '../repository/sound.repo';
import playerService from '../services/player.service';

const log = logger.child({ name: 'SoundMachine.ts' });

export default {
  async getButtons(): Promise<Button[]> {
    const buttonsConfig = config.get<ConfigButtonsI>('buttons');

    const ret: Button[] = [];
    let i = 0;
    for (const pin of buttonsConfig.pins) {
      const buttonInRepo = await soundRepo.getButton(i);
      const button: Button = {
        id: i,
        pin,
        path: buttonInRepo?.path,
        sound: buttonInRepo?.sound,
      };
      ret.push(button);
      i += 1;
    }

    return ret;
  },

  async updateButton(id: number, sound: { name: string, data: Buffer }): Promise<Button> {
    const pins = config.get<ConfigButtonsI>('buttons').pins;
    const updated: ButtonInRepo = await soundRepo.updateButton(id, sound.name, sound.data);
    const ret: Button = {
      id: updated.id,
      path: updated?.path,
      sound: updated?.sound,
      pin: pins[id],
    }
    return ret;
  },

  async playButtonSound(id: number): Promise<void> {
    const button = await soundRepo.getButton(id);

    if (!button) {
      log.warn(`No sound config for button ${id}`);
      return;
    }

    await playerService.play(button.path);
  },
}
