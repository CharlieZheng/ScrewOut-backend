import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthService} from "./service/AuthService";
import {AuthController} from "./controller/AuthController";
import {WechatAccount} from "./entity/WechatAccount";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./module/UserModule";
import {LoggingMiddleware} from "./middleware/LoggingMiddleware";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {UserGameProgress} from "./entity/UserGameProgress";
import {LevelRecord} from "./entity/LevelRecord";
import {User} from "./entity/User";

@Module({
    imports: [ TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'db',          // docker 用 db，本地可能是 localhost
        port: 3306,
        username: 'root',
        password: 'password123',
        database: 'screw_out',
        entities: [WechatAccount,User, LevelRecord],
        synchronize: true,
    }), UserModule, PassportModule,
        JwtModule.register({
            // 生产环境请放在 .env 文件中
            secret: 'SECRET_KEY_123456',
            signOptions: { expiresIn: '1h' }, // 1小时后过期
        }),],
    controllers: [AppController],
    providers: [AppService,JwtStrategy],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggingMiddleware)
            .forRoutes('*'); // 监听所有路由
    }
}
