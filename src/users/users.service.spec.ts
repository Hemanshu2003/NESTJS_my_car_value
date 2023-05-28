import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let fakeUserService: Partial<UsersService>;
  fakeUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    fakeUserService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(fakeUserService).toBeDefined();
  });
});
