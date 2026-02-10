import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entity/User";
import {Repository} from "typeorm";
import {AppController} from "../app.controller";
import {AuthController} from "../controller/AuthController";
import {AppService} from "../app.service";
import {AuthService} from "../service/AuthService";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, Repository <User>],
    controllers: [ AuthController],
 })
export class UserModule {}
