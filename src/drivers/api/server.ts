import config from 'config';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import httpContext from 'express-http-context';
import * as http from 'http';
import { ConfigApiI } from '../../config';
import customExpress, { CustomExpress } from '../../lib/customExpress/customExpress';
import { logger } from '../../logger/logger';
import accessLogger from './mdw/accessLogger';
import errorHandler from './mdw/errorHandler';
import methodNotAllowed from './mdw/methodNotAllowed';
import notFound from './mdw/notFound';
import requestUuid from './mdw/requestUuid';
import buttonRoutes from './routes/button.routes';
import healthRoutes from './routes/health.routes';

const log = logger.child({ name: 'server.ts' });

export default class Server {
  private app: CustomExpress;
  private server: http.Server;

  constructor(
    public port: number,
  ) {
    const customExpressLog = log.child({ name: 'customExpress' });
    this.app = customExpress({
      log: customExpressLog.info.bind(customExpressLog),
    });

    this.app.use(cors({
      origin: true,
      credentials: true,
    }));
    this.app.use(express.json());
    this.app.use(httpContext.middleware);
    this.app.use(requestUuid);
    this.app.use(accessLogger);
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));
    this.initRoutes();
    this.app.use(methodNotAllowed(this.app));
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  private initRoutes() {
    this.app.use('/health', healthRoutes);
    /** example routes. Remove then when you understand how to use it */
    this.app.use(`/api/v${config.get<ConfigApiI>('api').version}/button`, buttonRoutes);
    /** add your routes here (use the lines above as examples) */
  }

  async start() {
    return new Promise<void>((res, rej) => {
      this.server = this.app.listen(this.port, () => {
        this.app.printEndpoints();
        log.info(`Server is listening on port ${this.port}`);
        res();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((res, rej) => {
      this.server.close((err) => {
        if (err) {
          rej(err);
          return;
        }
        res();
      });
    });
  }
}
