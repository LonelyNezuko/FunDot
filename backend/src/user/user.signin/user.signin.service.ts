import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const geoip = require('geoip-lite')

import templateResponse from '../../../common/templates/response.tp'

import isValidPassword from 'common/functions/isValidPassword';
import isValidEmail from 'common/functions/isValidEmail';
import isValidUsername from 'common/functions/isValidUsername';

import { User } from '../user.entity';

@Injectable()
export class UserSigninService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async signup(
        username: string,
        password: string,
        email: string,
        promo: string,

        response: Response,
        request: Request
    ): Promise<void> {
        if(!username || !password || !email) {
            templateResponse(response, "error", "Fields should not be empty", 400)
            throw new UnauthorizedException
        }
        if(!isValidUsername(username)
            || !isValidPassword(password)
            || !isValidEmail(email)) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }
        if(promo && (promo.length < 4 || promo.length > 32)) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        let results = await this.userRepository.findOne({
            where: {
                username
            }
        })
        if(results) {
            templateResponse(response, "error", "Account witch this username already exists", 400)
            throw new UnauthorizedException
        }

        const ip = request.ip === '::1' ? '207.97.227.239' : request.ip
        const geo = geoip.lookup(ip)

        // здесь еще должна быть проверка на существуеммость промо

        const salt = bcryptjs.genSaltSync(15)
        const hash = bcryptjs.hashSync(password, salt)

        let insertId = await this.userRepository.insert({
            username,
            password: hash,
            email,
            promo,

            regIP: ip,
            country: geo.country
        })
        if(!insertId) {
            templateResponse(response, "error", "Failed to create an account", 400)
            throw new UnauthorizedException
        }

        insertId = insertId.raw.insertId
        templateResponse(response, "success", insertId, 200)
    }

    async signin(
        username: string,
        password: string,
        remember,
        
        response: Response,
        request: Request
    ): Promise<void> {
        remember = parseInt(remember)

        if(!username || !password || remember === undefined) {
            templateResponse(response, "error", "Fields should not be empty", 400)
            throw new UnauthorizedException
        }
        if(!isValidUsername(username)
            || !isValidPassword(password)
            || remember < 0 || remember > 1) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        let results = await this.userRepository.findOne({
            where: {
                username
            },
            select: [ 'id', 'username', 'password' ]
        })
        if(!results) {
            templateResponse(response, "error", "Account not found", 400)
            throw new UnauthorizedException
        }

        if(!bcryptjs.compareSync(password, results.password)) {
            templateResponse(response, "error", "Invalid account password", 400)
            throw new UnauthorizedException
        }

        let expin = '1d'
        if(remember) expin = '7d'

        const token = jwt.sign({
            id: results.id,
            username: results.username
        }, process.env.jwt_privatekey, { algorithm: 'HS256', expiresIn: expin })


        // response.cookie('jsonwebtoken', token, {
        //     httpOnly: true
        // })
        templateResponse(response, "success", token, 200)
    }

    // signout(
    //     response: Response,
    //     request: Request
    // ): void {
    //     templateResponse(response, "success", ``, 200)
    // }
}
