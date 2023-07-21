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

import { StorageService } from './storage.service';

@Controller('api/news')
export class StorageController {
    constructor(private readonly StorageService: StorageService) {}
}