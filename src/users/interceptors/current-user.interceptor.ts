import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { UserID } = request.session || {};

    if (UserID) {
      const user = await this.userService.findOne(UserID);
      request.CurrentUser = user;
    }

    return handler.handle();
  }
}
