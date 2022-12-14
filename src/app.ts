import config from 'config';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { ConfigApiI } from './config';
import Server from './drivers/api/server';
import raspberrypi from './drivers/raspberrypi/raspberrypiSetup';
import { logger } from './logger/logger';

dotenv.config();

const log = logger.child({ name: 'app.ts' });
log.info('Starting app...');

(async () => {
  try {
    const port = normalizePort(process.env.PORT, config.get<ConfigApiI>('api').port);

    log.info('Starting server...');
    const server = new Server(port);
    await server.start();
    log.info('Server started');

    log.info('Starting raspberry pi controller...');
    await raspberrypi.setUp();
    log.info('Raspberrypi started');

    log.info('application started');


    // manage app close
    process.on('SIGINT', async () => {
      log.info('Stopping server');
      await server.stop();
      log.info('Stopping raspberrypi');
      await raspberrypi.stop();
    });
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
})();

function normalizePort(val: string, defaultVal: number): number {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return defaultVal;
  }

  if (port >= 0) {
    return port;
  }

  return defaultVal;
}
