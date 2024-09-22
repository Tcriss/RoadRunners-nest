import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from "jwks-rsa";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PayloadI } from "../interface/payload.interface";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

    constructor(private config: ConfigService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.get('A_DOMAIN')}.well-known/jwks.json`
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: config.get('AUDIENCE'),
            issuer: config.get('DOMAIN'),
            algorithms: ['RS256'],
        });
    }

    async validate(payload: PayloadI): Promise<string> {
        return payload.sub;
    }
}