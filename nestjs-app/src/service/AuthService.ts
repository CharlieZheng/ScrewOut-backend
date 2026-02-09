/**
 * ==========================================
 * 2. 业务逻辑处理服务 (建议存放于 auth.service.ts)
 * ==========================================
 */
import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import axios from 'axios';
import {User} from "../entity/User";
// 如果分文件，这里需要引入上面的 User 实体
// import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    async wechatLogin(code: string) {
        const appId = 'YOUR_APP_ID';
        const appSecret = 'YOUR_APP_SECRET';

        const wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;

        try {
            const response = await axios.get(wxUrl);
            const {openid, session_key, errcode, errmsg} = response.data;

            if (errcode) {
                throw new HttpException(`微信接口调用失败: ${errmsg}`, HttpStatus.UNAUTHORIZED);
            }

            const accessToken = this.jwtService.sign({openid});

            let user = await this.userRepository.findOne({where: {openid}});

            if (!user) {
                user = this.userRepository.create({
                    openid,
                    session_key,
                    token: accessToken,
                });
            } else {
                user.session_key = session_key;
                user.token = accessToken;
                user.last_login_at = new Date();
            }

            await this.userRepository.save(user);

            return {
                success: true,
                data: {token: accessToken}
            };
        } catch (e) {
            throw new HttpException(e.message || '登录服务异常', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
