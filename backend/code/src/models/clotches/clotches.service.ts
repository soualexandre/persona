import { Injectable } from '@nestjs/common';
import { CreateClotchDto } from './dto/create-clotch.dto';
import { UpdateClotchDto } from './dto/update-clotch.dto';

@Injectable()
export class ClotchesService {
  create(createClotchDto: CreateClotchDto) {
    return 'This action adds a new clotch';
  }

  findAll() {
    return `This action returns all clotches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clotch`;
  }

  update(id: number, updateClotchDto: UpdateClotchDto) {
    return `This action updates a #${id} clotch`;
  }

  remove(id: number) {
    return `This action removes a #${id} clotch`;
  }
}
