import GPIO from 'rpi-gpio';

export default {
  async setup(pin: number, direction: 'in' | 'out'): Promise<boolean> {
    return new Promise((res, rej) => {
      GPIO.setup(pin, direction, (err, value) => {
        if (err) {
          return rej(err);
        }
        res(value);
      });
    });
  },

  detectPinChange(pins: number[], cb: (channel: number, value: boolean) => Promise<void>): void {
    GPIO.addListener('change', async (channel: number, value: boolean) => {
      if (pins.includes(channel)) {
        await cb(channel, value);
      }
    });
  },
}
