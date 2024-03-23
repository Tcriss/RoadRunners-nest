import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthStrategy } from './providers/auth.strategy';

@Module({
    providers: [ AuthStrategy ],
    imports: [ PassportModule.register({defaultStrategy: 'jwt'}) ]
})
export class AuthModule {}
