import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  logger = new Logger(RedisService.name);
  status = 'not connected';
  private client: Redis | null = null;

  onModuleInit() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set');
    }
    this.client = new Redis(redisUrl);
    this.client.on('connect', () => {
      this.logger.log('Connected to Redis');
      this.status = 'connected';
    });
    this.client.on('error', (err) => {
      this.logger.error('Redis connection error', err);
      this.status = 'error';
    });
  }
}
