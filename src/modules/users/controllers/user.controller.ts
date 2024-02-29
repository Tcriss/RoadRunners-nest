import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { IUser } from 'src/common/interfaces';
import { EditUser } from '../dto/user.dto';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get(':id')
    findOne(@Param('id') id: string): Promise<IUser> {
        return this.userService.findOneUser(id);
    }

    @Patch(':id')
    edit(@Param('id') id: string, @Body() user: EditUser): Promise<unknown> {
        return this.userService.editUser(id, user);
    }
}
