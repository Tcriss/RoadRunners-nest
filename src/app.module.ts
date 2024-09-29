import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { Environment } from './common/application/enums';
import { rateLimitConfig } from './common/application/config/rate-limit.config';
import { redisConfig } from './common/application/config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: rateLimitConfig
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: redisConfig
    }),
    VehiclesModule, 
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
