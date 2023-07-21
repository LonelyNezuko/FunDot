import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccountController } from './user.account.controller';
import { UserAccountService } from './user.account.service';

import { User } from '../user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserAccountController],
    providers: [UserAccountService],
})
export class UserAccountModule {}