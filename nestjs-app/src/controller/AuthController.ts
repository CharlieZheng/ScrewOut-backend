/**
 * ==========================================
 * 3. 路由控制器 (建议存放于 auth.controller.ts)
 * ==========================================
 */
import {Injectable, HttpException, HttpStatus, Get} from '@nestjs/common';

import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from "../service/AuthService";
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
}