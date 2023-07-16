import { Module } from '@nestjs/common';

import { AuthController } from './user.auth.controller';
import { AuthService } from './user.auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}