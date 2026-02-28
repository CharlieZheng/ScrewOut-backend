import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelRecord } from '../entity/LevelRecord';

@Injectable()
export class LevelRecordService {

  constructor(
    @InjectRepository(LevelRecord)
    private levelRecordRepository: Repository<LevelRecord>,
  ) {}

  async createRecord(data: {
     user_id: number
    level_index: number
    game_start_time: number
    game_end_time: number
  }) {

    const result = await this.levelRecordRepository.insert({
       user_id: data.user_id,
      level_index: data.level_index,
      game_start_time: data.game_start_time,
      game_end_time: data.game_end_time
    });

    return result;
  }
    // 获取指定用户的所有关卡记录
    async findAllByUser(userId: number) {
        return await this.levelRecordRepository .find({
            where: {
                // 注意：这里的 user 是实体中定义的关联字段名
                // TypeORM 允许直接传关联对象的 ID 进行过滤
                user_id:  userId
            },
            order: {
                level_index: 'ASC', // 按关卡顺序排序
            },
        });
    }
}