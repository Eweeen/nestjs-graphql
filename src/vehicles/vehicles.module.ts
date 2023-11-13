import { Module } from '@nestjs/common';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [],
  providers: [VehiclesResolver, VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
