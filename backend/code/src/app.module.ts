import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClotchesModule } from './models/clotches/clotches.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [ClotchesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
