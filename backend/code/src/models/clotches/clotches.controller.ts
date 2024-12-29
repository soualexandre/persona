import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClotchesService } from './clotches.service';
import { CreateClotchDto } from './dto/create-clotch.dto';
import { UpdateClotchDto } from './dto/update-clotch.dto';

@Controller('clotches')
export class ClotchesController {
  constructor(private readonly clotchesService: ClotchesService) {}

  @Post()
  create(@Body() createClotchDto: CreateClotchDto) {
    return this.clotchesService.create(createClotchDto);
  }

  @Get()
  findAll() {
    return this.clotchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clotchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClotchDto: UpdateClotchDto) {
    return this.clotchesService.update(+id, updateClotchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clotchesService.remove(+id);
  }
}
