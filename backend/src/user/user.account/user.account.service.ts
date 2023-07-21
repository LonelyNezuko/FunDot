import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import templateResponse from '../../../common/templates/response.tp'

import { User } from '../user.entity';

@Injectable()
export class UserAccountService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getUser(
        id: [ string, number ],

        response: Response,
        request: Request
    ): Promise<void> {
        let search = ''

        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        let results = await this.userRepository
            .createQueryBuilder("user")
            .where(`user.id = :id or user.link = :id`, { id: id })
            .getOne()
        if(!results) {
            templateResponse(response, "error", "Account not found", 400)
            throw new UnauthorizedException
        }

        delete results.password
        
        templateResponse(response, "success", results, 200)
    }
}
