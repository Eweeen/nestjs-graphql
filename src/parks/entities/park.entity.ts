import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Brand } from '../../brands/entities/brand.entity';

@ObjectType()
@Entity('parks')
export class Park {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Vehicle], { nullable: true })
  @OneToMany(() => Vehicle, (vehicle) => vehicle.park)
  vehicles: Vehicle[];

  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, (brand) => brand.parks, {
    nullable: true,
  })
  @JoinColumn({ name: 'brand_id' })
  brand?: Brand;
}
