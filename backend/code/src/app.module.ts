import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config.module';
import { ClothesModule } from './models/clotches/clothes.module';
import { UsersModule } from './models/users/users.module';
@Module({
  imports: [
    AppConfigModule, 
    ClothesModule, 
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'host.docker.internal', 
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'clothes_development',
        entities: [__dirname + '/models/**/*.{entity.ts,entity.js}'],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
