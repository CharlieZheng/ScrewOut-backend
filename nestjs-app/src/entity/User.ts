/**
 * ==========================================
 * 1. 数据库实体定义 (建议存放于 user.entity.ts)
 * ==========================================
 */
import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import * as trace_events from "node:trace_events";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id:number  ;
    @Column()
    nickname: string ;
    @Column({nullable: true   })
    avatar: string;
    @Column({nullable: true})

    gender: string;

}