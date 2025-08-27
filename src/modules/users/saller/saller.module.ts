import { Module } from '@nestjs/common';
import { SallerService } from './saller.service';
import { SallerController } from './saller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Saller, SallerSchema } from './schema/saller.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Saller.name, schema: SallerSchema }]),
  ],
  controllers: [SallerController],
  providers: [SallerService],
})
export class SallerModule {}
