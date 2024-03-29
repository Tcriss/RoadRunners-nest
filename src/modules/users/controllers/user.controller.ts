import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import { EditUser } from '../dto/user.dto';
import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<IUser> {
        return this.userService.findOneUser(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    edit(@Param('id') id: string, @Body() user: EditUser): Promise<unknown> {
        return this.userService.editUser(id, user);
    }
}
