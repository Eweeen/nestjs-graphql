import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Park } from '../parks/entities/park.entity';
import { VehicleInput } from './inputs/vehicle.input';

@Injectable()
export class VehiclesService {
  constructor(private dataSource: DataSource) {}

  vehiclesRepository(): Repository<Vehicle> {
    return this.dataSource.getRepository(Vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehiclesRepository().find();
  }

  async findOne(id: number): Promise<Vehicle> {
    return await this.vehiclesRepository().findOne({
      where: { id },
    });
  }

  async create(createVehicle: VehicleInput): Promise<Vehicle> {
    return await this.vehiclesRepository().save({
      immatriculation: createVehicle.immatriculation,
      model: createVehicle.model,
      park: { id: createVehicle.parkId },
    });
  }

  async update(id: number, updateVehicle: VehicleInput): Promise<Vehicle> {
    const vehicle: Vehicle = await this.findOne(id);
    if (!vehicle) throw new Error(`Vehicle ${id} not found`);

    Object.assign(vehicle, updateVehicle);

    return await this.vehiclesRepository().save({
      id,
      immatriculation: vehicle.immatriculation,
      model: vehicle.model,
      park: { id: updateVehicle.parkId },
    });
  }

  async delete(id: number): Promise<Vehicle> {
    const vehicle: Vehicle = await this.findOne(id);
    await this.vehiclesRepository().delete(id);
    return vehicle;
  }

  async loadPark(vehicleId: number): Promise<Park | null> {
    const vehicle: Vehicle = await this.vehiclesRepository().findOne({
      where: { id: vehicleId },
      relations: ['park'],
    });
    return vehicle ? vehicle.park : null;
  }
}
