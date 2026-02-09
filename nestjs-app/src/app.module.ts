import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthService} from "./service/AuthService";
import {AuthController} from "./controller/AuthController";
import {User} from "./entity/User";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AppController, AuthController],
    providers: [AppService, AuthService],
})
export class AppModule {
}
