import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBrand {
  @Field(() => String)
  name: string;
}
