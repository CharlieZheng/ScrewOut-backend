/**
 * ==========================================
 * 2. 业务逻辑处理服务 (建议存放于 auth.service.ts)
 * ==========================================
 */
import {Injectable, HttpException, HttpStatus, Post, Body} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import axios from 'axios';
import {WechatAccount} from "../entity/WechatAccount";
import {User} from '../entity/User'; // 确保路径正确
// 如果分文件，这里需要引入上面的 User 实体
// import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(WechatAccount)
        private wechatAccountRepository: Repository<WechatAccount>, @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    async wechatLogin(code: string) {
        const appId = 'wxb81f0c8de304d660';
        const appSecret = 'cd693a9d0524f886e8621b7b02d4e50a';

        const wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;

        try {
            const response = await axios.get(wxUrl);
            const {openid, session_key, errcode, errmsg} = response.data;

            if (errcode) {
                throw new HttpException(`微信接口调用失败: ${errmsg}`, HttpStatus.UNAUTHORIZED);
            }

            const accessToken = this.jwtService.sign({openid});

            let user = await this.wechatAccountRepository.findOne({where: {openid}});

            if (!user) {
                user = this.wechatAccountRepository.create({
                    "openid": openid,
                    "session_key": session_key
                });
            } else {
                user.session_key = session_key;
            }

            await this.wechatAccountRepository.save(user);

            return {
                success: true,
                data: {token: accessToken}
            };
        } catch (e) {
            throw new HttpException(e.message || '登录服务异常', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


// 模拟登录成功后签发 JWT
    async login(user: any) {
        // 👇 在这里调用 insert
       let insertResult = await this.userRepository.insert({
            nickname: user.username,
            avatar: "" ,
            gender:""
         });
       console .log( `insertResult: ${JSON.stringify(insertResult )}`)
        const payload = {username: user.username, sub: insertResult.identifiers[0].id };
         return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // 根据 ID 查找用户
    async findOne(id: number): Promise<User | null> {
        return await this.userRepository.findOneBy({id});
    }

}
