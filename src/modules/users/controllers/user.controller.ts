import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { EditUser } from '../dto/user.dto';
import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get()
    findOne(@Req() req: { user: string }): Promise<IUser> {
        return this.userService.findOneUser(req.user);
    }

    @UseGuards(JwtGuard)
    @Patch()
    edit(@Body() user: EditUser, @Req() req: { user: string }): Promise<unknown> {
        return this.userService.editUser(req.user, user);
    }
}
