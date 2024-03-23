import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GetVerificationKey, expressjwt as jwt} from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';

import { PUBLIC_KEY } from '../../../common/constans/public-access.key';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private config: ConfigService, private reflector: Reflector) {}

  private async verify(req: any | Response, res: any | Response): Promise<boolean> {
    const checkJwt = promisify(jwt({
      secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.config.get('A_DOMAIN')}.well-known/jwks.json`
      }) as GetVerificationKey,
      audience: this.config.get('AUDIENCE'),
      algorithms: ['RS256']
    }));

    try {
      await checkJwt(req, res);
      return true
    } catch (error) {
      throw new HttpException('check your credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY,[
      context.getHandler(), context.getClass()
    ]);

    if (isPublic) return true;

    return await this.verify(req, res);
  }
}
