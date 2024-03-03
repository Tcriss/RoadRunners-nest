import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './guards/auth.guard';
import { JwtProvider } from './providers/jwt.provider';

@Module({
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ],
    imports: [JwtProvider],
    exports: [JwtProvider]
})
export class AuthModule {}
