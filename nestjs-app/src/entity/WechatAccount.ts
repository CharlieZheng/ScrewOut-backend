/**
 * ==========================================
 * 1. 数据库实体定义 (建议存放于 user.entity.ts)
 * ==========================================
 */
import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('wechat_account')
export class WechatAccount {
    @PrimaryColumn()
    id:number  ;
    @Column()
    user_id: number ;
    @Column()
    openid: string;
    @Column({nullable: true})

    session_key: string;

}