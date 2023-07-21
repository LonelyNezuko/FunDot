import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Response, Request } from "express";

import templateResponse from "common/templates/response.tp";
import getJSONWebToken from "common/functions/getJSONWebToken";
import { News } from "./news.entity";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>
    ) {}

    async create(
        text: string,
        attachments: string,
        access: string,
        isNotify: number,

        response: Response,
        request: Request
    ) {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        if(!text || !attachments || !access || isNotify === undefined) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }
        if(!text.length || (access !== 'public' && access !== 'friends' && access !== 'subs' && access !== 'friends/subs' && access !== 'hidden')) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        let insertId = await this.newsRepository.insert({
            user_id: id,
            body: {
                text,
                attached: attachments
            },
            views: [ id ],

            isNotify: Boolean(isNotify),
            access
        })
        if(!insertId) {
            templateResponse(response, "error", "Failed to create a news item", 400)
            throw new UnauthorizedException
        }

        insertId = insertId.raw.insertId
        templateResponse(response, "success", insertId, 200)
    }

    async pin(
        newsID: number,

        response: Response,
        request: Request
    ) {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        if(!newsID) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        const news = await this.newsRepository.findOne({
            where: {
                id: newsID,
                user_id: id
            },
            select: [ 'isPin' ]
        })
        if(!news) {
            templateResponse(response, "error", "The news was not found or you are not its author", 400)
            throw new UnauthorizedException
        }

        await this.newsRepository.update({ user_id: id }, { isPin: false })
        await this.newsRepository.update(newsID, { isPin: !news.isPin })

        templateResponse(response, "success", "", 200)
    }

    async delete(
        newsID: number,

        response: Response,
        request: Request
    ) {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        if(!newsID) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        const news = await this.newsRepository.findOne({
            where: {
                id: newsID,
                user_id: id
            },
            select: [ 'id' ]
        })
        if(!news) {
            templateResponse(response, "error", "The news was not found or you are not its author", 400)
            throw new UnauthorizedException
        }

        await this.newsRepository.delete({ id: newsID, user_id: id })
        templateResponse(response, "success", "", 200)
    }


    async like(
        newsID: number,

        response: Response,
        request: Request
    ) {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        if(!newsID) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        const news = await this.newsRepository.findOne({
            where: { id: newsID },
            select: [ 'user_id', 'likes', 'dislikes', 'access' ]
        })
        if(!news) {
            templateResponse(response, "error", "The news was not found", 400)
            throw new UnauthorizedException
        }

        if(news.user_id !== id
            && (news.access === 'hidden')) { // + добавить friends, subs, friends/subs (вынести в функцию)
            templateResponse(response, "error", "The news is not available to you", 400)
            throw new UnauthorizedException
        }

        if(news.dislikes.indexOf(id) !== -1) news.dislikes.splice(news.dislikes.indexOf(id), 1)
        if(news.likes.indexOf(id) === -1) news.likes.push(id)

        await this.newsRepository.update(newsID, {
            likes: news.likes,
            dislikes: news.dislikes
        })
        templateResponse(response, "success", "", 200)
    }
    async dislike(
        newsID: number,

        response: Response,
        request: Request
    ) {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }

        if(!newsID) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        const news = await this.newsRepository.findOne({
            where: { id: newsID },
            select: [ 'user_id', 'likes', 'dislikes', 'access' ]
        })
        if(!news) {
            templateResponse(response, "error", "The news was not found", 400)
            throw new UnauthorizedException
        }

        if(news.user_id !== id
            && (news.access === 'hidden')) { // + добавить friends, subs, friends/subs (вынести в функцию)
            templateResponse(response, "error", "The news is not available to you", 400)
            throw new UnauthorizedException
        }

        if(news.likes.indexOf(id) !== -1) news.likes.splice(news.likes.indexOf(id), 1)
        if(news.dislikes.indexOf(id) === -1) news.dislikes.push(id)

        await this.newsRepository.update(newsID, {
            likes: news.likes,
            dislikes: news.dislikes
        })
        templateResponse(response, "success", "", 200)
    }

    async view(
        newsID: number,

        response: Response,
        request: Request
    ) {
        const { id } = getJSONWebToken(request)
        if(!id) {
            templateResponse(response, "error", "Incorrect request", 400)
            throw new UnauthorizedException
        }
        if(!newsID) {
            templateResponse(response, "error", "Incorrect data", 400)
            throw new UnauthorizedException
        }

        const news = await this.newsRepository.findOne({
            where: { id: newsID },
            select: [ 'user_id', 'views', 'access' ]
        })
        if(!news) {
            templateResponse(response, "error", "The news was not found", 400)
            throw new UnauthorizedException
        }

        if(news.user_id === id) {
            templateResponse(response, "error", "You are the author of this news", 400)
            throw new UnauthorizedException
        }

        if(news.access === 'hidden') { // + добавить friends, subs, friends/subs (вынести в функцию)
            templateResponse(response, "error", "The news is not available to you", 400)
            throw new UnauthorizedException
        }

        if(news.views.indexOf(id) === -1) news.views.push(id)
        await this.newsRepository.update(newsID, {
            views: news.views
        })
        templateResponse(response, "success", "", 200)
    }
}