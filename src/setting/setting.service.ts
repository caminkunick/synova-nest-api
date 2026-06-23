import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Setting } from './setting.entity';
import { decode, sign, verify } from 'jsonwebtoken';
import { SettingNotImplementedException } from './setting.exception';

@Injectable()
export class SettingService {
  constructor(
    // 💡 ฉีด Repository เข้ามาใช้งานในนี้
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async findSettingById(id: number): Promise<Setting | null> {
    try {
      const setting = await this.settingRepository.findOneBy({
        setting_id: id,
      });
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

  async updateSettingById(id: number, data: string): Promise<Setting> {
    try {
      const json = decode(data);
      const setting = await this.settingRepository.findOneBy({
        setting_id: id,
      });
      if (!setting) {
        throw new Error('Setting not found');
      }
      setting.value = JSON.stringify(json);
      return await this.settingRepository.save(setting);
    } catch (error) {
      console.error('Error updating setting by ID:', error);
      throw error;
    }
  }

  async generateToken(secret: string, payload: object): Promise<string> {
    if (!secret || !payload) {
      throw new Error('Secret and payload are required to generate a token');
    }
    // ใช้ library jsonwebtoken เพื่อสร้าง token
    return sign(payload, secret);
  }

  async updateSettingByToken(token: string): Promise<Setting | null> {
    try {
      const decoded = verify(
        token,
        process.env.SECRET_KEY || 'default_secret',
      ) as Record<'key' | 'value', string>;
      const setting = await this.settingRepository.findOneBy({
        code: decoded.key,
      });
      if (!setting) {
        const insertResult = await this.settingRepository.insert({
          code: decoded.key,
          value: decoded.value,
        });
        const newSettingId = insertResult.identifiers[0].setting_id;
        return await this.settingRepository.findOneBy({
          setting_id: newSettingId,
        });
      } else {
        setting.value = decoded.value;
        await this.settingRepository.update(
          { setting_id: setting.setting_id },
          {
            value: decoded.value,
          },
        );
        return await this.settingRepository.findOneBy({
          setting_id: setting.setting_id,
        });
      }
    } catch (error: any) {
      throw new SettingNotImplementedException(error.message);
    }
  }
}
