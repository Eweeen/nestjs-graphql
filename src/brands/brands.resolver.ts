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
import { Brand } from './entities/brand.entity';
import { BrandsService } from './brands.service';
import { Park } from '../parks/entities/park.entity';
import { BrandInput } from './inputs/brand.input';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(
    private readonly brandsService: BrandsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Brand])
  async brands(): Promise<Brand[]> {
    return await this.brandsService.findAll();
  }

  @Query(() => Brand)
  async brand(@Args('id', { type: () => Int }) id: number): Promise<Brand> {
    return await this.brandsService.findOne(id);
  }

  @Mutation(() => Brand)
  async createBrand(
    @Args('createBrandData') createBrand: BrandInput,
  ): Promise<Brand> {
    const createdBrand: Brand = await this.brandsService.create(createBrand);
    await this.pubSub.publish('brandChange', { brandChange: createdBrand });
    return createdBrand;
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBrandData') updateBrand: BrandInput,
  ): Promise<Brand> {
    const updatedBrand: Brand = await this.brandsService.update(
      id,
      updateBrand,
    );
    await this.pubSub.publish('brandChangeById', {
      brandChangeById: updatedBrand,
    });
    return updatedBrand;
  }

  @Subscription(() => [Brand], {
    name: 'brandChange',
    async resolve(this: BrandsResolver): Promise<Brand[]> {
      return await this.brandsService.findAll();
    },
  })
  subscriptionToBrandChange(): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator('brandChange');
  }

  @Subscription(() => Brand, {
    name: 'brandChangeById',
    filter: (payload, variables): boolean =>
      +payload.brandChangeById.id === +variables.id,
  })
  subscriptionToBrandChangeById(
    @Args('id', { type: () => Int }) id: number,
  ): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator('brandChangeById');
  }

  @ResolveField(() => [Park])
  async parks(@Parent() brand: Brand): Promise<Park[]> {
    return brand.parks
      ? brand.parks
      : await this.brandsService.loadParks(brand.id);
  }
}
