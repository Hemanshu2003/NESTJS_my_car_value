import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
interface classContructor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: classContructor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private Dto;
    constructor(Dto: classContructor);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
