import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { UserModules } from './users/user.module';
import { UserMiddleware } from './middleware/user.middleware';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users/models/users.entity';

@Module({
  imports: [
    UserModules,
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    SequelizeModule.forRoot({
      dialect:'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models:[UserModel]
    })
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'users/{*splat}', method: RequestMethod.ALL });
  }
}
