import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/env.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: config.DB_SYNC, //prod: false
      autoLoadEntities: true,
      entities: ['dist/core/entity/*.entity{.ts,.js'],
    }),
  ],
})
export class AppModule {}
