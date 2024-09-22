import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './application/services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [HttpModule]
})
export class UsersModule {}