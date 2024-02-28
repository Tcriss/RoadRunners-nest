import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from './modules/connection/connection.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    VehiclesModule, 
    AuthModule, 
    ConnectionModule
  ],
})
export class AppModule {}
