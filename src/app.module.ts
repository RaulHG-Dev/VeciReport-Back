import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachModule } from './modules/attach/attach.module';
import { CatTypeReportModule } from './modules/cat-type-report/cat-type-report.module';
import { CommunityModule } from './modules/community/community.module';
import { ReportModule } from './modules/report/report.module';
import { UserModule } from './modules/user/user.module';

@Module({
  providers: [
  ],
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('HOST_DATABASE'),
        port: parseInt(configService.get<string>('DB_PORT') || '3386', 10),
        username: configService.get('USER_DATABASE'),
        password: configService.get('PASSWORD_DATABASE'),
        database: configService.get('NAME_DATABASE'),
        autoLoadEntities: false,
        synchronize: configService.get('APP_ENV') === 'development',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    // Importing the modules
    CommunityModule,
    ReportModule,
    UserModule,
    AttachModule,
    CatTypeReportModule
  ],
  controllers: [],
})
export class AppModule { }
