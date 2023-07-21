import { 
    Controller,
    
    Get,
    Post,
    
    Param,
    Query,

    Res,
    Req } from '@nestjs/common';
import { Response, Request } from 'express'

import { UserAccountService } from './user.account.service';

@Controller('/api/user/account')
export class UserAccountController {
    constructor(private readonly UserAccountService: UserAccountService) {}

    @Get('/:id')
    async getUser(
        @Param('id') id: [string, number],

        @Res() res: Response,
        @Req() req: Request
    ): Promise<void> {
        return this.UserAccountService.getUser(id, res, req)
    }
}