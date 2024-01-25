import { Module } from '@nestjs/common';
import { BrandsResolver } from './brands.resolver';
import { BrandsService } from './brands.service';
import { SharedModule } from '../shared.module';

@Module({
  imports: [SharedModule],
  providers: [BrandsResolver, BrandsService],
})
export class BrandsModule {}
