/**
 * ==========================================
 * 3. 路由控制器 (建议存放于 auth.controller.ts)
 * ==========================================
 */
import {Injectable, HttpException, HttpStatus, Get, UseGuards, UnauthorizedException, Req} from '@nestjs/common';

import {Controller, Post, Body, Request} from '@nestjs/common';
import {AuthService} from "../service/AuthService";
import {AuthGuard} from "@nestjs/passport";
import {LevelRecordService} from "../service/LevelRecordService";
// 如果分文件，这里需要引入上面的 AuthService
// import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,private readonly levelRecordService: LevelRecordService ) {
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
    @Post('test_login')
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
        console.log(`userId: ${userId}`)
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
    @UseGuards(AuthGuard('jwt'))

    @Post('save_record')
    async create(@Request() req, @Body() body: any) {

        const result = await this.levelRecordService.createRecord({

            user_id: req.user.userId,
            level_index: body.level_index,
            game_start_time: body.game_start_time,
            game_end_time: body.game_end_time,
        });

        return {
            message: 'insert success',
            result
        };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('levels') // 请求路径：GET /game/levels
    async getMyLevels(@Req() req) {
        // 这里的 req.user 来自 JwtStrategy 的 validate 方法
        // 假设你存入的是 userId
        const userId = req.user.userId;

        const records = await this.levelRecordService .findAllByUser(userId);

        return {
            code: 200,
            message: '查询成功',
            data: records,
        };
    }
}