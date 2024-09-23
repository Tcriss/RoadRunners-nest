import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { IUser } from '../../domain/interfaces';
import { EditUserDto } from '../../domain/dto';

@Injectable()
export class UserService {

    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cache: Cache,
        private readonly http: HttpService,
        private readonly config: ConfigService
    ) { }

    private async getToken(): Promise<string> {
        const cachedToken: string = await this.cache.get('token');

        if (cachedToken) return cachedToken;

        const body: unknown = {
            client_id: this.config.get('A_CLIENTID'),
            client_secret: this.config.get('A_SECRET'),
            audience: `${this.config.get('A_DOMAIN')}api/v2/`,
            grant_type: "client_credentials"
        };
        const token = await firstValueFrom(
            this.http.post<string>(`${this.config.get('A_DOMAIN')}oauth/token`, body, {
                headers: { "content-type": `application/json` }
            }).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(`An error happend while trying getting token: \n ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            )),
        );
        await this.cache.set('token', token.data);

        return token.data['access_token'];
    }

    public async findOneUser(uid: string): Promise<IUser> {
        const user: IUser = await this.cache.get('user');

        if (user) return user;

        const token: string = await this.getToken();
        const res: AxiosResponse<IUser> = await firstValueFrom(
            this.http.get<IUser>(`${this.config.get('A_DOMAIN')}api/v2/users/${uid}`, {
                headers: { "authorization": `Bearer ${token}` }
            }).pipe(
                catchError((error) => {
                    throw new HttpException(`Error getting user: \n ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            )),
        );
        await this.cache.set('user', res.data);

        return res.data;
    }

    public async editUser(uid: string, user: EditUserDto): Promise<unknown> {
        if (!user.family_name || !user.given_name) throw new HttpException('No fields were found to update your user.', HttpStatus.BAD_REQUEST);

        const token: string = await this.getToken();
        const res: AxiosResponse<EditUserDto> = await firstValueFrom(
            this.http.patch(`${this.config.get('A_DOMAIN')}api/v2/users/${uid}`, user, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "authorization": `Bearer ${token}`
                }
            }).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(`Error while trying to update user: \n ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            )),
        );
        await this.cache.set('user', res.data);

        return res.data;
    }
}
