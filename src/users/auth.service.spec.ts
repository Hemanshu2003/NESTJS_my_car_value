import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // create a fake copy of the user Service
    const users: User[] = [];
    fakeUserService = {
      find: (email: string) => {
        const filterUser = users.filter((user) => user.email === email);
        return Promise.resolve(filterUser);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUserService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create a instance of authService', async () => {
    expect(service).toBeDefined();
  });

  it('creates a New user with salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user try to sign up with email already in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');

    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('Throws error if signup is called with unused email', async () => {
    await expect(service.signin('a@sd.com', 'ssd')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throw if Invalid password is provided', async () => {
    await service.signup('asc@asf.com', 'dadadad');

    await expect(service.signin('asc@asf.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypass');

    const user = await service.signin('asdf@asdf.com', 'mypass');

    expect(user).toBeDefined();
  });
});
