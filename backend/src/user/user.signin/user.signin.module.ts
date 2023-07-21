import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSigninController } from './user.signin.controller';
import { UserSigninService } from './user.signin.service';

import { User } from '../user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserSigninController],
    providers: [UserSigninService],
})
export class UserSigninModule {}