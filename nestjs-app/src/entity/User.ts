/**
 * ==========================================
 * 1. 数据库实体定义 (建议存放于 user.entity.ts)
 * ==========================================
 */
import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity('wechat_users')
export class User {
    @PrimaryColumn()
    openid: string;

    @Column({nullable: true})
    session_key: string;

    @Column({nullable: true, length: 500})
    token: string;

    @UpdateDateColumn()
    last_login_at: Date;

    @CreateDateColumn()
    created_at: Date;
}