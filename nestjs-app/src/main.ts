import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {UserModule} from "./module/UserModule";
import * as fs from 'fs';
import * as path from 'path';
async function bootstrap() {
    // 1. 读取证书文件
    // 注意：如果是 Docker 运行，这里的路径是容器内的路径
    const httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, '../certs/screw-out.gg-bond.fun.key')),
        cert: fs.readFileSync(path.join(__dirname, '../certs/screw-out.gg-bond.fun.pem')),
    };
    const app = await NestFactory.create(AppModule,{httpsOptions});

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
