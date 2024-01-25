import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { ParksService } from './parks.service';
import { Park } from './entities/park.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Brand } from '../brands/entities/brand.entity';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Park)
export class ParksResolver {
  constructor(
    private readonly parksService: ParksService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Park])
  async parks(): Promise<Park[]> {
    return await this.parksService.findAll();
  }

  @Subscription(() => Park, {
    name: 'parkChange',
    filter: (payload, variables): boolean => {
      return +payload.parkChange.id === +variables.id;
    },
    async resolve(this: ParksResolver, value: any): Promise<Park> {
      return await this.parksService.findOne(value.parkChange.id, ['vehicles']);
    },
  })
  parkChange(
    @Args('id', { type: () => Int }) id: number,
  ): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator('parkChange');
  }

  @ResolveField(() => [Vehicle])
  async vehicles(@Parent() park: Park): Promise<Vehicle[]> {
    return park.vehicles
      ? park.vehicles
      : await this.parksService.loadVehicles(park.id);
  }

  @ResolveField(() => Brand)
  async brand(@Parent() park: Park): Promise<Brand> {
    return park.brand
      ? park.brand
      : await this.parksService.loadBrands(park.id);
  }
}
