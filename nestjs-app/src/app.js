import { NestFactory } from '@nestjs/core';
import { Module, Get } from '@nestjs/common';

// 最小化的控制器
@Module({
    controllers: [
        new (class {
            @Get()
            getHello() {
                return { message: 'Hello World from NestJS and MySQL!' };
            }
        })(),
    ],
})
class AppModule {}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // 监听容器内的 3000 端口
    await app.listen(3000, '0.0.0.0');
}
bootstrap();