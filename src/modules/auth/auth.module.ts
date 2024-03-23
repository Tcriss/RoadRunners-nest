import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { AuthStrategy } from './providers/auth.strategy';

@Module({
    providers: [ AuthService, AuthStrategy ],
    imports: [ PassportModule.register({defaultStrategy: 'jwt'}) ]
})
export class AuthModule {}
