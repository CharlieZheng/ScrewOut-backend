import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthService} from "./service/AuthService";
import {AuthController} from "./controller/AuthController";
import {User} from "./entity/User";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./module/UserModule";

@Module({
    imports: [ UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
