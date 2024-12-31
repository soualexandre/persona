import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clothes } from './entities/clothes.entity';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { ClothesRepository } from './repository/clothes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Clothes])],
  controllers: [ClothesController],
  providers: [ClothesService, ClothesRepository],
  exports: [ClothesRepository],
})
export class ClothesModule {}
