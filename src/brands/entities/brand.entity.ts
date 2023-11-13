import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Park } from '../../parks/entities/park.entity';

@ObjectType()
@Entity('brands')
export class Brand {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Park], { nullable: true })
  @OneToMany(() => Park, (park) => park.brand)
  parks: Park[];
}
