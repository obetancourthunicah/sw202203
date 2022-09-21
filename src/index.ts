import * as moduleAlias from 'module-alias';
import logger from '@utils/logger';
const srcPath = 'src';
moduleAlias.addAliases({
  "@config": `${srcPath}/config`,
      "@handlers": `${srcPath}/handlers`,
      "@libs": `${srcPath}/libs`,
      "@middleware": `${srcPath}/middleware`,
      "@models": `${srcPath}/dao/models`,
      "@routes": `${srcPath}/routes`,
      "@utils": `${srcPath}/utils`,
      "@dao": `${srcPath}/dao`
});

import { createServer } from '@config/express';
import { AddressInfo } from 'net';
import http from 'http';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;
const startServer = async () => {
  const app = await createServer();
  const server = http.createServer(app);
  server.listen({host, port}, () => {
    const address = server.address() as AddressInfo;
    logger.info(`Server is running on http://${address.address}:${address.port}`);
  });
  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async ()=> {
      try {
        logger.info(`Process ${type} signal received`);
        logger.info('Closing http server');
        server.close();
        logger.info('Http server closed');
        process.exit(0);
      } catch (error) {
        console.error(`Error occurred while closing http server: ${error}`);
        process.exit(1);
      }
    });
  });
};

startServer();
