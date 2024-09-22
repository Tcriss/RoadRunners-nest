import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';

import { UserService } from '../../application/services/user.service';
import { IUser } from '../../domain/interfaces';
import { EditUserDto } from '../../domain/dto';
import { JwtGuard } from '../../../auth/application/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    findOne(@Req() req: { user: string }): Promise<IUser> {
        return this.userService.findOneUser(req.user);
    }

    @Patch()
    edit(@Body() user: EditUserDto, @Req() req: { user: string }): Promise<unknown> {
        return this.userService.editUser(req.user, user);
    }
}
