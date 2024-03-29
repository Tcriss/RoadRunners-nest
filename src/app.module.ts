import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConnectionProvider } from './connection/connection.provider';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { UsersModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

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
