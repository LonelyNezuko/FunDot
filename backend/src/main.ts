import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser())

    await app.listen(process.env.PORT);

    console.log(`NestJS started on ${process.env.PORT} port`)
}
bootstrap();
