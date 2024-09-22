import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { Environment } from './common/application/enums';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get('DB_URI'),
        ssl: true,
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== Environment.Production,
        logging: true
      })
    }),
    VehiclesModule, 
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
