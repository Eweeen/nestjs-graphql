import { Field, Int, InterfaceType, ObjectType } from '@nestjs/graphql';
import { Park } from '../parks/entities/park.entity';

@InterfaceType()
export abstract class IVehicle {
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  immatriculation: string;

  @Field((type) => String)
  model: string;

  @Field((type) => Park)
  park: Park;
}

@ObjectType({ implements: () => [IVehicle] })
export class Cars implements IVehicle {
  id: number;
  immatriculation: string;
  model: string;
  park: Park;

  @Field((type) => String)
  color: string;
}
