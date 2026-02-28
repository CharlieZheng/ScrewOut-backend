/**
 * ==========================================
 * 1. 数据库实体定义 (建议存放于 user.entity.ts)
 * ==========================================
 */
import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import * as trace_events from "node:trace_events";
import {User} from "./User";

@Entity('level_record')
export class LevelRecord {
    @PrimaryGeneratedColumn()
    id:number  ;
    @Column()
    user_id: number ;

    @Column()
    level_index: number ;
    @Column({ type: 'bigint', comment: '游戏开始时间戳(毫秒)' })

    game_start_time: number ;
    @Column({ type: 'bigint', comment: '游戏开始时间戳(毫秒)' })
    game_end_time: number ;



}