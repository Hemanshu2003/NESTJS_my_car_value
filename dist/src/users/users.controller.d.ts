import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: any): Promise<User>;
    whoAmI(user: User): User;
    login(Body: CreateUserDto, session: any): Promise<User>;
    signOut(session: any): void;
    findUser(id: string): Promise<User>;
    findAllUser(email: string): Promise<User[]>;
    updateUser(id: string, body: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
