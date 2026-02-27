/**
 * ==========================================
 * 3. 路由控制器 (建议存放于 auth.controller.ts)
 * ==========================================
 */
import {Injectable, HttpException, HttpStatus, Get, UseGuards, UnauthorizedException} from '@nestjs/common';

import {Controller, Post, Body, Request} from '@nestjs/common';
import {AuthService} from "../service/AuthService";
import {AuthGuard} from "@nestjs/passport";
// 如果分文件，这里需要引入上面的 AuthService
// import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    async login(@Body('code') code: string) {
        if (!code) {
            throw new HttpException('缺失参数: code', HttpStatus.BAD_REQUEST);
        }
        return await this.authService.wechatLogin(code);
    }

    @Get()
    getHello(): string {
        return "auth";
    }

// 公开接口：用于登录
    @Post('login')
    async testLogin(@Body() body: any) {
        // 实际应校验 body.password，这里直接模拟一个用户
        const user = {id: 10086, username: body.username || 'guest'};
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('info')
    async getUserInfo(@Request() req) {
        // 1. 从 req.user 中获取 JWT 校验后存入的 id
        // 注意：这里的字段名要看你在 jwt.strategy.ts 的 validate 方法里返回了什么
        const userId = req.user.userId;

        // 2. 去数据库查询完整信息
        const user = await this.authService.findOne(userId);

        if (!user) {
            throw new UnauthorizedException('用户不存在');
        }

        return {
            code: 200,
            data: user,
            message: '获取成功'
        };
    }
}