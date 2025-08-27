import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ConnectDatabase implements OnModuleInit {
  async onModuleInit() {
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('✅ MongoDB muvaffaqiyatli ulandi!');
    });

    connection.on('error', (err) => {
      console.error('❌ MongoDB ulanishda xatolik:', err);
    });

    connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB bilan aloqa uzildi');
    });
  }
}
