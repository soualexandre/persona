import { Module } from '@nestjs/common';
import { ClotchesService } from './clotches.service';
import { ClotchesController } from './clotches.controller';

@Module({
  controllers: [ClotchesController],
  providers: [ClotchesService],
})
export class ClotchesModule {}
