import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

import { UserSigninModule } from './user.signin/user.signin.module';
import { UserAccountModule } from './user.account/user.account.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),

        UserSigninModule,
        UserAccountModule
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}