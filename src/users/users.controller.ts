import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/User.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGaurd } from '../gaurds/auth.gaurd';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.UserID = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGaurd)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signin')
  async login(@Body() Body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(Body.email, Body.password);
    session.UserID = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    if (!session.UserID) {
      throw new BadRequestException('Pls login First!');
    }
    session.UserID = null;
  }
  // @UseInterceptors(new SerializeIntercept or(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Unable to Find User!');
    }
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
