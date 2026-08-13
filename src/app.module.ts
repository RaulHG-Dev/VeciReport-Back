import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttachModule } from './modules/attach/attach.module';
import { CatTypeReportModule } from './modules/cat-type-report/cat-type-report.module';
import { CommunityModule } from './modules/community/community.module';
import { ReportModule } from './modules/report/report.module';
import { UserModule } from './modules/user/user.module';

@Module({
  providers: [],
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
