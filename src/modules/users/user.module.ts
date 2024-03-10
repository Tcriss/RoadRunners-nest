import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { checkToken } from 'src/common/middlewares/auth0.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [HttpModule]
})
export class UsersModule {

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(checkToken).exclude(
      { path: 'vehicles', method: RequestMethod.GET}
    )
  }
}
