import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import fs from 'fs';
import path from 'path';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly redisService: RedisService) {}

  @Get()
  getStatus() {
    const packageFile = fs.readFileSync(
      path.join(__dirname, '../package.json'),
      'utf-8',
    );
    const packageJson = JSON.parse(packageFile);
    const version = packageJson.version;
    return {
      status: 'ok',
      version: version,
      current: process.cwd(),
      redis: this.redisService.status,
    };
  }
}
