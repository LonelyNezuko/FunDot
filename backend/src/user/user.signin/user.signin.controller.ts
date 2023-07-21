import { 
    Controller,
    
    Get,
    Post,
    
    Param,
    Query,
    Body,

    Res,
    Req,

    Ip} from '@nestjs/common';
import { UserSigninService } from './user.signin.service';

import { Response, Request } from 'express'

@Controller('api/user/signin')
export class UserSigninController {
    constructor(private readonly UserSigninService: UserSigninService) {}

    @Post('/up')
    async signup(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('email') email: string,
        @Body('promo') promo: string,

        @Res() res: Response,
        @Req() req: Request): Promise<void> {
        console.log(username)
        return await this.UserSigninService.signup(username, password, email, promo, res, req)
    }

    @Get()
    async signin(
        @Query('username') username: string,
        @Query('password') password: string,
        @Query('remember') remember: number,

        @Res() res: Response,
        @Req() req: Request): Promise<void> {
        return await this.UserSigninService.signin(username, password, remember, res, req)
    }

    // @Get('/out')
    // async signout(
    //     @Res() res: Response,
    //     @Req() req: Request): Promise<void> {
    //     return await this.UserSigninService.signout(res, req)
    // }
}