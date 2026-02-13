/**
 * ==========================================
 * 1. 数据库实体定义 (建议存放于 user.entity.ts)
 * ==========================================
 */
import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import * as trace_events from "node:trace_events";

@Entity('user_game_progress')
export class UserGameProgress {
    @Column()
    user_id:number  ;
    @Column()
    current_level_index: number ;


}