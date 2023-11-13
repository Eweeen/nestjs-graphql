import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Park } from '../../parks/entities/park.entity';

@ObjectType()
@Entity('vehicles')
export class Vehicle {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  immatriculation: string;

  @Field(() => String)
  @Column()
  model: string;

  @Field(() => Park, { nullable: true })
  @ManyToOne(() => Park, (park) => park.vehicles, {
    nullable: true,
  })
  @JoinColumn({ name: 'park_id' })
  park?: Park;
}
