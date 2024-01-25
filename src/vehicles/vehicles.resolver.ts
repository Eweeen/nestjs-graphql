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
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(
    private readonly vehiclesService: VehiclesService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

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
    const createdVehicle: Vehicle = await this.vehiclesService.create(
      createVehicle,
    );

    await this.pubSub.publish('vehicleChange', {
      vehicleChange: createdVehicle,
    });
    if (createdVehicle.park) {
      await this.pubSub.publish('parkChange', {
        parkChange: createdVehicle.park,
      });
    }

    return createdVehicle;
  }

  @Mutation(() => Vehicle)
  async updateVehicle(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateVehicleData') updateVehicle: VehicleInput,
  ): Promise<Vehicle> {
    const updatedVehicle = await this.vehiclesService.update(id, updateVehicle);

    await this.pubSub.publish('vehicleChange', {
      vehicleChange: updatedVehicle,
    });
    if (updatedVehicle.park) {
      await this.pubSub.publish('parkChange', {
        parkChange: updatedVehicle.park,
      });
    }

    return updatedVehicle;
  }

  // Suppression
  @Mutation(() => Vehicle)
  async deleteVehicle(
      @Args('id', { type: () => Int }) id: number,
  ): Promise<Vehicle> {
      const deletedVehicle: Vehicle = await this.vehiclesService.delete(id);

      await this.pubSub.publish('vehicleChange', {
          vehicleChange: deletedVehicle,
      });
      if (deletedVehicle.park) {
          await this.pubSub.publish('parkChange', {
              parkChange: deletedVehicle.park,
          });
      }

      return deletedVehicle;
  }

  @Subscription(() => Vehicle, {
    name: 'vehicleChange',
    async resolve(this: VehiclesResolver, data): Promise<Vehicle> {
      return await this.vehiclesService.findOne(data.vehicleChange.id);
    },
  })
  vehicleChange(): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator('vehicleChange');
  }

  @ResolveField(() => Park)
  async park(@Parent() vehicle: Vehicle): Promise<Park> {
    return vehicle.park
      ? vehicle.park
      : await this.vehiclesService.loadPark(vehicle.id);
  }
}
