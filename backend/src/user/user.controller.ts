import { 
    Controller,
    
    Get,
    Post,
    Put,
    
    Param,
    Query,

    Res,
    Req } from '@nestjs/common';
import { UserService } from './user.service';
import templateResponse from 'common/templates/response.tp';

import { Response, Request } from 'express';

@Controller('api/user')
export class UserController {
    constructor(private readonly UserService: UserService) {}

    // @Get()
    // getHello(@Res() response: Response): string {
    //     return templateResponse(response, "error", "")
    // }

    @Get('/nav')
    async getNav(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<void> {
        return this.UserService.getNav(res, req)
    }

    @Put('/online')
    async setOnline(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<void> {
        return this.UserService.setOnline(res, req)
    }
}