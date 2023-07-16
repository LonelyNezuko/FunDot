import { Injectable } from "@nestjs/common"
import { User } from "./user.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    
    isExists(id: [string, number]): string {
        return `${id} ${typeof id}`
    }
}