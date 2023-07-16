import { Controller, Get } from '@nestjs/common';
import { AuthService } from './user.auth.service';

@Controller('user/auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Get()
    test(): string {
        return 'test auth'
    }
}