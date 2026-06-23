import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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

  @Post('update')
  async updateSettingById(@Query('token') token: string) {
    return await this.settingService
      .updateSettingByToken(token)
      .catch((error) => {
        return {
          status: 'error',
          message: error.message,
        };
      });
  }

  @Post('gen/token')
  async generateSettings(
    @Body('secret') secret: string,
    @Body('payload') payload: object,
  ) {
    return await this.settingService
      .generateToken(secret, payload)
      .then((token) => {
        return {
          status: 'ok',
          token: token,
        };
      })
      .catch((error) => {
        return {
          status: 'error',
          message: error.message,
        };
      });
  }
}
