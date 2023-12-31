import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';
import { Park } from '../parks/entities/park.entity';
import { VehicleInput } from './inputs/vehicle.input';
import { IVehicle } from './vehicles.interface';
import { PubSub } from 'graphql-subscriptions';

const pubSub: PubSub = new PubSub();

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
  async createVehicle(
    @Args('createVehicleData') createVehicle: VehicleInput,
  ): Promise<Vehicle> {
    return await this.vehiclesService.create(createVehicle);
  }

  @Mutation(() => Vehicle)
  async updateVehicle(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateVehicleData') updateVehicle: VehicleInput,
  ): Promise<Vehicle> {
    return await this.vehiclesService.update(id, updateVehicle);
  }

  @Subscription(() => [Vehicle], {
    name: 'vehicleChange',
    async resolve(this: VehiclesResolver): Promise<Vehicle[]> {
      return await this.vehiclesService.findAll();
    },
  })
  vehicleChange(): AsyncIterator<unknown, any, undefined> {
    return pubSub.asyncIterator('vehicleChange');
  }

  @ResolveField(() => Park)
  async park(@Parent() vehicle: Vehicle): Promise<Park> {
    return vehicle.park
      ? vehicle.park
      : await this.vehiclesService.loadPark(vehicle.id);
  }
}
