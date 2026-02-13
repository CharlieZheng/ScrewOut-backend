import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthService} from "./service/AuthService";
import {AuthController} from "./controller/AuthController";
import {WechatAccount} from "./entity/WechatAccount";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./module/UserModule";
import {LoggingMiddleware} from "./middleware/LoggingMiddleware";

@Module({
    imports: [ TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'db',          // docker 用 db，本地可能是 localhost
        port: 3306,
        username: 'root',
        password: 'password123',
        database: 'screw_out',
        entities: [WechatAccount],
        synchronize: true,
    }), UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes('*'); // 监听所有路由
    }
}
