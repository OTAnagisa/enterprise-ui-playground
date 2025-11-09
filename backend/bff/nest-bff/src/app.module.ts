import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    SearchModule,
  ],
})
export class AppModule {}
