import { NestMiddleware } from '@nestjs/common';
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
export declare class CurrentUserMiddleware implements NestMiddleware {
    private userService;
    constructor(userService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
