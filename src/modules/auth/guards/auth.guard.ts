import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '../services/auth.service';
import { PUBLIC_KEY } from 'src/common/constants/public-access.key';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  private async extractTokenFromHeader(headers: Headers): Promise<string> {
    if (!headers['authorization']) throw new HttpException("Couldn't get token, property authorization is missing in headers", HttpStatus.BAD_REQUEST);

    const [type, token]: string = headers['authorization'].split(' ');

    if (type !== 'Bearer') throw new HttpException('Invalid format token', HttpStatus.BAD_REQUEST);
    if (!token) throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
    
    return token; 
  }

  private async verifyToken(token: string): Promise<object> {
    return await this.authService.verifyToken(token);
  }

  private async checkCredentials(req: Request): Promise<boolean> {
    console.log(req.headers);6
    const token: string = await this.extractTokenFromHeader(req.headers);
    const payload = await this.verifyToken(token);

    req['user'] = payload;

    return true;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(), context.getClass()
    ]);

    if (isPublic) return true;
    
    return await this.checkCredentials(req);
  }
}