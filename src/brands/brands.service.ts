import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { Park } from '../parks/entities/park.entity';
import { BrandInput } from './inputs/brand.input';

@Injectable()
export class BrandsService {
  constructor(private dataSource: DataSource) {}

  brandsRepository(): Repository<Brand> {
    return this.dataSource.getRepository(Brand);
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandsRepository().find();
  }

  async findOne(id: number): Promise<Brand> {
    return await this.brandsRepository().findOne({
      where: { id },
    });
  }

  async create(createBrand: BrandInput): Promise<Brand> {
    return await this.brandsRepository().save(createBrand);
  }

  async update(id: number, updateBrand: BrandInput): Promise<Brand> {
    const brand: Brand = await this.brandsRepository().findOneBy({ id });
    if (!brand) throw new Error('Brand not found');

    Object.assign(brand, updateBrand);
    return await this.brandsRepository().save(brand);
  }

  async loadParks(brandId: number): Promise<Park[]> {
    const brand: Brand = await this.brandsRepository().findOne({
      where: { id: brandId },
      relations: ['parks'],
    });
    return brand ? brand.parks : [];
  }
}
