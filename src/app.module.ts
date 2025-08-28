import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm';
import { AdminModule } from './modules/users/admin/admin.module';
import { SallerModule } from './modules/users/saller/saller.module';
import { CategoryModule } from './modules/post/category/category.module';
import { AppService } from './database/database';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env'
  }),
  TypeOrmModule.forRoot({
    type:'postgres',
    url:String(process.env.DB_URL),
    synchronize:true,
    autoLoadEntities:true,
    entities:[]
  }),
  AdminModule,
  SallerModule,
  CategoryModule
,],
providers:[AppService],
})
export class AppModule {}
