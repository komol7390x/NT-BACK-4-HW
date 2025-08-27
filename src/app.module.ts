import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { ConnectDatabase} from './database/database';
import { AdminModule } from './admin/admin.module';
import { SallerModule } from './saller/saller.module';

@Module({
  providers:[ConnectDatabase],
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env'
  }),
MongooseModule.forRoot(String(process.env.MONGO_DB)),
AdminModule,
SallerModule],
})
export class AppModule {}
