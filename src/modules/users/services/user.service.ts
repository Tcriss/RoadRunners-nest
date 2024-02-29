import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';

import { EditUser } from '../dto/user.dto';
import { IUser } from 'src/common/interfaces';

@Injectable()
export class UserService {

    constructor(private http: HttpService, private config: ConfigService) { }

    private async getToken(): Promise<string> {
        const body: unknown = {
            client_id: this.config.get('A_CLIENTID'),
            client_secret: this.config.get('A_SECRET'),
            audience: `${this.config.get('A_DOMAIN')}/api/v2/`,
            grant_type: "client_credentials"
        }

        const token = await firstValueFrom(
            this.http.post<string>(`${this.config.get('A_DOMAIN')}/oauth/token`, body, {
                headers: {"content-type": `application/json`}
            }).pipe(
                catchError((error: AxiosError) => {
                    throw new HttpException(`An error happend while trying getting token: \n ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            )),
        );

        return token.data['access_token'];
    }

    public async findOneUser(id: string): Promise<IUser> {
        const token: string = await this.getToken();
        const res: AxiosResponse<IUser> = await firstValueFrom(
            this.http.get<IUser>(`${this.config.get('A_DOMAIN')}/api/v2/users/${id}`, {
                headers: {"authorization": `Bearer ${token}`}
            }).pipe(
                catchError((error) => {
                    throw new HttpException(`Error getting user: \n ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            )),
        );
    
        return res.data
    }

    public async editUser(id: string, user: EditUser): Promise<unknown> {
        const token: string = await this.getToken();
        const res: AxiosResponse<EditUser> = await firstValueFrom(
            this.http.patch<EditUser>(`${this.config.get('A_DOMAIN')}/api/v2/users/${id}`, user, {
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

        return res.data
    }
}
