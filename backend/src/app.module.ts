import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// user module
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

// news module
import { NewsModule } from './news/news.module';
import { News } from './news/news.entity';

// storage module
import { StorageModule } from './storage/storage.module';

// middleware
import { JSONWebTokenMiddleware } from 'common/middleware/jwt';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.mysql_host,
            port: parseInt(process.env.mysql_port),
            username: process.env.mysql_username,
            password: process.env.mysql_password,
            database: process.env.mysql_database,
            entities: [User, News],
            synchronize: true,
            autoLoadEntities: true,
        }),

        UserModule,
        NewsModule,

        StorageModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JSONWebTokenMiddleware)
            .exclude(
                '/api/user/signin',
                '/api/user/signin/(.*)'
            )
            .forRoutes('*')
    }
}
