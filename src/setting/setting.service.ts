import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Setting } from './setting.entity';

@Injectable()
export class SettingService {
  constructor(
    // 💡 ฉีด Repository เข้ามาใช้งานในนี้
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async findSettingById(id: number): Promise<Setting | null> {
    return await this.settingRepository.findOneBy({ setting_id: id });
  }
}
