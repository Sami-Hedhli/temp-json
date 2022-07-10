import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const parentType = chalk
      .hex('#87e8de')
      .bold(`${context.getArgs()[0].route.path}`);

    const fieldName = chalk
      .hex('#87e8de')
      .bold(`${context.getArgs()[0].route.stack[0].method}`);

    const logo = chalk.red('✇');

    return next.handle().pipe(
      tap(() => {
        Logger.debug(`${logo}  ${parentType} » ${fieldName}`, 'Restful');
        // console.log(context.getArgs()[0]['route']);
      }),
    );
  }
}
