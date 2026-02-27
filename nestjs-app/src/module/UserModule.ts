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
import {UserGameProgress} from "../entity/UserGameProgress";
import {LevelRecord} from "../entity/LevelRecord";

@Module({
    imports: [TypeOrmModule.forFeature([WechatAccount, User, UserGameProgress, LevelRecord]), JwtModule.register({
        secret: 'your-secret',
        signOptions: {expiresIn: '7d'},
    }),],
    providers: [AuthService],
    controllers: [AuthController],
})
export class UserModule {
}
