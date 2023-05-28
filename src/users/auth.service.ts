import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email in use!
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('Email Already in Use!');
    }

    // Hash User Password
    //generate a salt
    const salt = randomBytes(8).toString('hex');

    // hash the salt and password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join salt and result
    const result = salt + '.' + hash.toString('hex');

    // Create a New User and save it
    const user = await this.userService.create(email, result);

    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('User not Found!!');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect / Bad Password!');
    }

    return user;
  }
}
