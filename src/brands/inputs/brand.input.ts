import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BrandInput {
  @Field(() => String)
  name: string;
}
