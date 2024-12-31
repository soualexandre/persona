import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Clothes } from '../entities/clothes.entity';

@Injectable()
export class ClothesRepository {
  constructor(
    @InjectRepository(Clothes)
    private readonly repository: Repository<Clothes>,
  ) {}

  async findAll(): Promise<Clothes[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Clothes | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(clothesData: Partial<Clothes>): Promise<Clothes> {
    const newClothes = this.repository.create(clothesData);
    return this.repository.save(newClothes);
  }

  async update(id: string, clothesData: Partial<Clothes>): Promise<Clothes> {
    await this.repository.update(id, clothesData);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
