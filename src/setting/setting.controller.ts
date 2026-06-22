import { Controller, Get, Param } from '@nestjs/common';
import { SettingService } from './setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  async getStatus() {
    return {
      status: 'ok',
    };
  }

  @Get('id/:id')
  async getSettingById(@Param('id') id: string) {
    const result = await this.settingService
      .findSettingById(Number(id))
      .catch((error) => error);
    if (result instanceof Error) {
      return {
        status: 'error',
        message: result.message,
      };
    }
    return {
      status: 'ok',
      data: result,
    };
  }
}
