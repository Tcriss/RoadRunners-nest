import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConnectionProvider } from './connection/connection.provider';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ConnectionProvider,
    VehiclesModule, 
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
