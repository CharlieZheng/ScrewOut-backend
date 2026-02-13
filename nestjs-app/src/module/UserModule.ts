import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WechatAccount} from "../entity/WechatAccount";
import {Repository} from "typeorm";
import {AppController} from "../app.controller";
import {AuthController} from "../controller/AuthController";
import {AppService} from "../app.service";
import {AuthService} from "../service/AuthService";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([WechatAccount]), JwtModule.register({
        secret: 'your-secret',
        signOptions: { expiresIn: '7d' },
    }),],
    providers: [AuthService ],
    controllers: [ AuthController],
 })
export class UserModule {}
