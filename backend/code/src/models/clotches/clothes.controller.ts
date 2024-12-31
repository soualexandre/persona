import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
  Request,
  UploadedFile
} from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { ClothesService } from './clothes.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) { }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'clotcheImageFront', maxCount: 1 },
      { name: 'clotcheImageBack', maxCount: 1 },
    ])
  )
  async create(
    @Body() createClothesDto: { clotcheDescription: string },
    @UploadedFiles() files: { 
      clotcheImageFront?: Express.Multer.File[], 
      clotcheImageBack?: Express.Multer.File[] 
    }
  ) {
    const frontSvgString = files.clotcheImageFront?.[0]?.buffer.toString();
    const backSvgString = files.clotcheImageBack?.[0]?.buffer.toString();

    return this.clothesService.create({
      clotcheDescription: createClothesDto.clotcheDescription,
      clotcheImageFront: frontSvgString,
      clotcheImageBack: backSvgString,
    });
  }


  @Get()
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClotheDto: UpdateClotheDto) {
    return this.clothesService.update(id, updateClotheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothesService.delete(id);
  }
}
