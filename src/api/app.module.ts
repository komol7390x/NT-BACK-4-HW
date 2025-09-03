import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env.config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: config.DB_SYNC, //prod: false
      autoLoadEntities: true,
      entities: ['dist/core/entity/*.entity{.ts,.js'],
    }),
    AdminModule,
  ],
})
export class AppModule {}
