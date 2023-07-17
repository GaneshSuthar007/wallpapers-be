import { Module } from '@nestjs/common';
import { ApiService } from './apis.service';
import { ApiController } from './apis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleConfigs } from '../config/constants';

@Module({
  imports: [TypeOrmModule.forFeature(ModuleConfigs['app'].entities)],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
