import { Injectable,OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ConnectDatabase {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit(){
    try {
      await this.sequelize.authenticate();
      console.log('Server in connect to PSQL');
    } catch (error) {
      console.log('Error connect database: ', error.message);
      process.exit(1);
    }
  }
}
