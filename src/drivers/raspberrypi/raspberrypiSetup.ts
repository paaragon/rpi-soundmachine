import config from 'config';
import { BinaryValue, Gpio } from 'onoff';
import { ConfigButtonsI, ConfigLedI } from '../../config';
import soundmachine from '../../domains/soundmachine';
import { logger } from '../../logger/logger';

const log = logger.child({ name: 'raspberrypiSetup.ts' });

const buttonsConfig = config.get<ConfigButtonsI>('buttons');
const buttonsPins = buttonsConfig.pins;

const ledPin = config.get<ConfigLedI>('led').pin;

const buttons: Gpio[] = [];
let led: Gpio;

export default {
  async setUp() {
    log.info('setting pins');
    // setup buttons
    for (const pin of buttonsPins) {
      log.info(`Button ${pin} setup`);
      const button = new Gpio(pin, 'in', 'rising', { debounceTimeout: 10 });
      buttons.push(button);
      button.watch(async (err: Error, value: BinaryValue) => {
        if (err) {
          throw err;
        }
        await buttonHandler(pin, value);
      });
    }

    // setup led
    led = new Gpio(ledPin, 'out');
    for (let i = 0; i < 3; i++) {
      led.writeSync(1);
      await wait(1000);
      led.writeSync(0);
      await wait(1000);
    }
  },
  async stop() {
    led.unexport();
    for (const button of buttons) {
      button.unexport();
    }
  },
}


async function buttonHandler(channel: number, value: BinaryValue) {
  try {
    log.info(`${channel} - ${value}`);
    // turn on led
    led.writeSync(1);
    // play sound
    const pinPosition = buttonsPins.indexOf(channel);
    await soundmachine.playButtonSound(pinPosition);
    // turn off led
    await wait(1000);
    led.writeSync(0);
  } catch (e) {
    log.error(e);
  }
}

async function wait(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(() => res(), ms);
  });
}
