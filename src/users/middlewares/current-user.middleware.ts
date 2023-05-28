// 2 id
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log('middleware', req.session);
    const { UserID } = req.session || {};

    if (UserID) {
      const user = await this.userService.findOne(UserID);

      req.currentUser = user;
    }

    next();
  }
}
