import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
  ],
  controllers: [AppController],
  // providers: [AppService, RedisService],
  providers: [AppService],
})
export class AppModule {}
