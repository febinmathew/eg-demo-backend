import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import User from './user/entity/User.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `.env.${process.env.STAGE.trim()}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mongodb',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          entities: [User],
          synchronize: process.env.STAGE.trim() == 'development',
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
