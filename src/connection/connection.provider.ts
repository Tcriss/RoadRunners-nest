import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Environment } from "../common/enums/environment.enum";

export const ConnectionProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory (config: ConfigService) {
        const isDev: boolean = this.config.get('NODE_ENV') !== Environment.Production
        const connection: TypeOrmModuleOptions = {
            type: 'mongodb',
            url: config.get('DB_URI'),
            ssl: true,
            autoLoadEntities: true,
            synchronize: isDev,
            logging: true
        }

        return connection;
    }
})