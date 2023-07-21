import { 
    Controller,
    
    Get,
    Post,
    Put,
    Delete,
    
    Param,
    Query,
    Body,

    Res,
    Req } from '@nestjs/common';

import { Response, Request } from 'express';

import { NewsService } from './news.service';

@Controller('api/news')
export class NewsController {
    constructor(private readonly NewsService: NewsService) {}

    @Post('/create')
    async create(
        @Body('text') text: string,
        @Body('attachments') attachments: string,
        @Body('access') access: string,
        @Body('isNotify') isNotify: string,

        @Res() res: Response,
        @Req() req: Request) {
        return this.NewsService.create(text, attachments, access, parseInt(isNotify), res, req)
    }

    @Put('/pin')
    async pin(
        @Body('id') newsID: string,

        @Res() res: Response,
        @Req() req: Request) {
        return this.NewsService.pin(parseInt(newsID), res, req)
    }

    @Delete('/delete')
    async delete(
        @Body('id') newsID: string,

        @Res() res: Response,
        @Req() req: Request) {
        return this.NewsService.delete(parseInt(newsID), res, req)
    }

    @Put('/like')
    async like(
        @Body('id') newsID: string,

        @Res() res: Response,
        @Req() req: Request) {
        return this.NewsService.like(parseInt(newsID), res, req)
    }
    @Put('/dislike')
    async dislike(
        @Body('id') newsID: string,

        @Res() res: Response,
        @Req() req: Request) {
        return this.NewsService.dislike(parseInt(newsID), res, req)
    }

    @Put('/view')
    async view(
        @Body('id') newsID: string,

        @Res() res: Response,
        @Req() req: Request) {
        return this.NewsService.view(parseInt(newsID), res, req)
    }
}