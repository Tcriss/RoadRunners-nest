import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$')
    given_name?: string;

    @IsOptional()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$')
    family_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    picture?: string;
}