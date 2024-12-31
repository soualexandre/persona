import { Injectable, NotFoundException } from '@nestjs/common';
import { Clothes } from './entities/clothes.entity';
import { ClothesRepository } from './repository/clothes.repository';

@Injectable()
export class ClothesService {
  constructor(private readonly clothesRepository: ClothesRepository) {}

  async findAll(): Promise<Clothes[]> {
    return this.clothesRepository.findAll();
  }

  async findById(id: string): Promise<Clothes> {
    const clothes = await this.clothesRepository.findById(id);
    if (!clothes) {
      throw new NotFoundException('Clothes not found');
    }
    return clothes;
  }

  async create(data: Partial<Clothes>): Promise<Clothes> {
    console.log('data', data)
    return this.clothesRepository.create(data);
  }

  async update(id: string, data: Partial<Clothes>): Promise<Clothes> {
    await this.findById(id); 
    return this.clothesRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); 
    await this.clothesRepository.delete(id);
  }
}
