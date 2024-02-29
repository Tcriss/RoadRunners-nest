import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConnectionModule } from './connection/connection.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ConnectionModule,
    VehiclesModule, 
    UsersModule,
    AuthModule, 
  ],
})
export class AppModule {}
