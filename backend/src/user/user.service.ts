import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from "./user.entity"

import { Response, Request } from "express";

import templateResponse from "common/templates/response.tp";
import getJSONWebToken from "common/functions/getJSONWebToken";

const jwt = require('jsonwebtoken')

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getNav(
        response: Response,
        request: Request
    ): Promise<void> {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        let results = await this.userRepository.findOne({
            where: { id },
            select: [ 'avatar', 'username', 'id', 'link', 'isInTeam' ]
        })
        if(!results) {
            templateResponse(response, "error", "Account witch this ID not found", 400)
            throw new UnauthorizedException
        }

        if(!results.link.length) results.link = results.id.toString()
        
        templateResponse(response, "success", results, 200)
    }

    async setOnline(
        response: Response,
        request: Request
    ): Promise<void> {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        let results = await this.userRepository.update(id, { online: new Date() })
        if(!results) {
            templateResponse(response, "error", "Account witch this ID not found", 400)
            throw new UnauthorizedException
        }
        
        templateResponse(response, "success", '', 200)
    }
}