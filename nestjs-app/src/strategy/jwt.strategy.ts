import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 指定从 Header 的 Authorization: Bearer <token> 中提取
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY_123456', // 必须和 Module 里的 secret 一致
        });
    }

    // 如果 Token 合法，Passport 会解析出 payload 并调用此方法
    async validate(payload: any) {
        // 这里的返回值会被 Nest 挂载到 req.user 上
        return { userId: payload.sub, username: payload.username };
    }
}