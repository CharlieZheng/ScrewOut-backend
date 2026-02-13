/**
 * ==========================================
 * 1. 数据库实体定义 (建议存放于 user.entity.ts)
 * ==========================================
 */
import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import * as trace_events from "node:trace_events";

@Entity('level_record')
export class LevelRecord {
    @PrimaryColumn()
    id:number  ;
    @Column()
    user_id:number  ;
    @Column()
    level_index: number ;
    @Column()
    game_start_time: number ;
    @Column()
    game_end_time: number ;
    @Column()
    time_cost_in_seconds: number ;


}