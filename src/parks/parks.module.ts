import { Module } from '@nestjs/common';
import { ParksResolver } from './parks.resolver';
import { ParksService } from './parks.service';
import { SharedModule } from '../shared.module';

@Module({
  imports: [SharedModule],
  providers: [ParksResolver, ParksService],
  exports: [ParksService],
})
export class ParksModule {}
