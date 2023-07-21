import { Injectable, NestMiddleware } from '@nestjs/common';
import templateResponse from 'common/templates/response.tp';

import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken')

@Injectable()
export class JSONWebTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['jwt']
        if(!token)return templateResponse(res, "error", "You are not logged in", 401)

        try {
            const data = jwt.verify(token, process.env.jwt_privatekey)
            if(!data)return templateResponse(res, "error", "You are not logged in", 401)

            next()
        }
        catch(e) {
            return templateResponse(res, "error", "You are not logged in", 401)
        }
    }
}
