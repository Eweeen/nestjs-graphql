import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class VehicleInput {
  @Field(() => String, { nullable: true })
  immatriculation?: string;

  @Field(() => String, { nullable: true })
  model?: string;

  @Field(() => ID, { nullable: true })
  parkId?: number;
}
