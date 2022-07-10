import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NODE_ENV, DOMAIN, PORT } from './environments';
import {
  Logger,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import * as compression from 'compression';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // enable cors
    app.enableCors();

    // prevent cross-site forgery
    // app.use(csurf());

    // compress response body
    app.use(compression());

    app.setGlobalPrefix('/api');

    // add dtos validations
    app.useGlobalPipes(new ValidationPipe());

    //NODE_ENV !== 'testing' && app.use(LoggerMiddleware);

    // interceptors
    //app.useGlobalInterceptors(new LoggingInterceptor());

    const server = await app.listen(PORT!);

    NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at https://${DOMAIN!}:${chalk
            .hex('#87e8de')
            .bold(`${PORT!}`)}`,
          'Bootstrap',
        )
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${PORT!}`)}`,
          'Bootstrap',
        );
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch((e) => {
  throw e;
});
