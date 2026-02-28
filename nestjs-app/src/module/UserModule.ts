import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WechatAccount} from "../entity/WechatAccount";
import {Repository} from "typeorm";
import {AppController} from "../app.controller";
import {AuthController} from "../controller/AuthController";
import {AppService} from "../app.service";
import {AuthService} from "../service/AuthService";
import {JwtModule} from "@nestjs/jwt";
import {User} from "../entity/User";
import {LevelRecord} from "../entity/LevelRecord";
import {LevelRecordService} from "../service/LevelRecordService";

@Module({
    imports: [TypeOrmModule.forFeature([WechatAccount, User,  LevelRecord]), JwtModule.register({
        secret: 'SECRET_KEY_123456',
        signOptions: {expiresIn: '1h'},
    }),],
    providers: [AuthService, LevelRecordService],
    controllers: [AuthController],
})
export class UserModule {
}
