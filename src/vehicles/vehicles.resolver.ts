import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { Park } from '../parks/entities/park.entity';
import { UpdateVehicle } from './inputs/updateVehicle.input';
import { IVehicle } from './vehicles.interface';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  async vehicles(): Promise<Vehicle[]> {
    return await this.vehiclesService.findAll();
  }

  @Query(() => IVehicle)
  async vehicle(@Args('id', { type: () => Int }) id: number): Promise<Vehicle> {
    return await this.vehiclesService.findOne(id);
  }

  @Mutation(() => Vehicle)
  async updateVehicle(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateVehicleData') updateVehicle: UpdateVehicle,
  ): Promise<Vehicle> {
    return await this.vehiclesService.update(id, updateVehicle);
  }

  @ResolveField(() => Park)
  async park(@Parent() vehicle: Vehicle): Promise<Park> {
    return vehicle.park
      ? vehicle.park
      : await this.vehiclesService.loadPark(vehicle.id);
  }
}
