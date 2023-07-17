import { ApiModule } from './modules/apis.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiKeyStrategy } from './utils/api.key.strategy';
import { ModuleConfigs } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('database');
        return {
          type: config.type,
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.database,
          synchronize: config.synchronize,
          logging: config.logging,
          entities: ModuleConfigs['app'].entities,
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ApiModule,
  ],
  providers: [ConfigService, ApiKeyStrategy],
})
export class AppModule {}
