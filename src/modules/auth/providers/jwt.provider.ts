import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';

export const JwtProvider: DynamicModule = JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
        global: true,
        signOptions: {
            algorithm: 'RS256',
            audience: config.get('AUDIENCE'),
            issuer: config.get('A_DOMAIN')
        }
    })
});