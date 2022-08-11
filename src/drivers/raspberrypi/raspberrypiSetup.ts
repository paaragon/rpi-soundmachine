import config from 'config';
import { ConfigButtonsI } from '../../config';
import soundmachine from '../../domains/soundmachine';
import { logger } from '../../logger/logger';
import gpioService from '../../services/gpio.service';

const log = logger.child({ name: 'raspberrypiSetup.ts' });

const buttons = config.get<ConfigButtonsI>('buttons');
const pins = buttons.pins;

export default {
  async setUp() {
    log.info('setting pins');
    for (const pin of pins) {
      const res = await gpioService.setup(pin, 'in');
      log.info(`${pin} setup: ${res}`);
    }

    gpioService.detectPinChange(pins, buttonHandler);
  },
}

async function buttonHandler(channel: number, value: boolean) {
  log.info(`${channel} - ${value}`);
  const pinPosition = pins.indexOf(channel);

  soundmachine.playButtonSound(pinPosition);
}
