import { Controller, Get, Param } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('id/:id')
  async getSettingById(@Param('id') id: string) {
    const result = await this.settingService.findSettingById(Number(id));
    return {
        status: 'ok',
        data: result,
    }
  }
}
