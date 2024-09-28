import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from '../../application/services/user.service';
import { userServiceMock } from '../../domain/mocks';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock
        }
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
