import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ParksService } from './parks.service';
import { Park } from './entities/park.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Brand } from '../brands/entities/brand.entity';

@Resolver(() => Park)
export class ParksResolver {
  constructor(private readonly parksService: ParksService) {}

  @Query((returns) => [Park])
  async parks(): Promise<Park[]> {
    return await this.parksService.findAll();
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
