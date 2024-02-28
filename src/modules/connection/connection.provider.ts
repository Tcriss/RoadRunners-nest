import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

export const ConnectionProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
        type: 'mongodb',
        url: config.get('DB_URI'),
        ssl: true,
        autoLoadEntities: true,
        synchronize: true,
        logging: true
    })
})