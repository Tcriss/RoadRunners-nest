import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly config: ConfigService,private jwt: JwtService) {}

    public async verifyToken(token: string): Promise<unknown> {
        return this.jwt.verifyAsync(token);
    }
}
