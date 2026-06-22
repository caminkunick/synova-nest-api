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
    try {
      const setting = await this.settingRepository.findOneBy({ setting_id: id });
      if (!setting) {
        return null; // หรือคุณอาจจะโยนข้อผิดพลาดขึ้นมาแทนก็ได้
      }
      return setting;
    } catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น เช่น log หรือโยนข้อผิดพลาดขึ้นมาใหม่
      console.error('Error finding setting by ID:', error);
      throw error; // หรือคุณอาจจะโยนข้อผิดพลาดที่กำหนดเองขึ้นมาแทนก็ได้
    }
  }
}
