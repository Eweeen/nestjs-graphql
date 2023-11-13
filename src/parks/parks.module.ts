import { Module } from '@nestjs/common';
import { ParksResolver } from './parks.resolver';
import { ParksService } from './parks.service';

@Module({
  imports: [],
  providers: [ParksResolver, ParksService],
  exports: [ParksService],
})
export class ParksModule {}
