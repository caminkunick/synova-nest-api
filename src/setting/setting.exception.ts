import { BadRequestException } from '@nestjs/common';

export class SettingNotImplementedException extends BadRequestException {
  constructor(message: string) {
    super(message);
    this.name = 'SettingNotImplementedException';
  }
}
