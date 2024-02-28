import { Module } from '@nestjs/common';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from './modules/connection/connection.module';

@Module({
  imports: [VehiclesModule, AuthModule, ConnectionModule],
})
export class AppModule {}
