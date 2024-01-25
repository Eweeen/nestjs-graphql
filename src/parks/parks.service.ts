import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Park } from './entities/park.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class ParksService {
  constructor(private dataSource: DataSource) {}

  parksRepository(): Repository<Park> {
    return this.dataSource.getRepository(Park);
  }

  async findOne(id: number, relations?: string[]): Promise<Park> {
    return await this.parksRepository().findOne({
      where: { id },
      relations: ['vehicles'],
    });
  }

  async findAll(): Promise<Park[]> {
    return await this.parksRepository().find();
  }

  async loadVehicles(parkId: number): Promise<Vehicle[] | null> {
    const park: Park = await this.parksRepository().findOne({
      where: { id: parkId },
      relations: ['vehicles'],
    });
    return park ? park.vehicles : [];
  }

  async loadBrands(parkId: number): Promise<Brand | null> {
    const park: Park = await this.parksRepository().findOne({
      where: { id: parkId },
      relations: ['brand'],
    });
    return park ? park.brand : null;
  }
}
