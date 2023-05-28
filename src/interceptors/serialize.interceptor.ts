import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface classContructor {
  new (...args: any[]): {};
}

export function Serialize(dto: classContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private Dto: classContructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the requset handler

    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.Dto, data, {
          excludeExtraneousValues: true,
        });
        //run something before the response is send out!!
      }),
    );
  }
}
