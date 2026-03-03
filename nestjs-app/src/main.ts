import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {UserModule} from "./module/UserModule";
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
    // 1. 读取证书文件
    // 注意：如果是 Docker 运行，这里的路径是容器内的路径
    const httpsOptions = {
        key: fs.readFileSync('/app/certs/screw-out.gg-bond.fun.key'),
        cert: fs.readFileSync('/app/certs/screw-out.gg-bond.fun_bundle.pem'),
    };
    const app = await NestFactory.create(AppModule,{httpsOptions});
    // const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
