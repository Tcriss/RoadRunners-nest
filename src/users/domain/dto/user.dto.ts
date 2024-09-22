import { IsEmail, IsOptional, IsString } from 'class-validator';

import { IUser } from '../interfaces';

export class EditUserDto implements IUser {
    @IsOptional()
    @IsString()
    given_name: string;

    @IsOptional()
    @IsString()
    family_name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    picture: string;
}