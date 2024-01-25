import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehiclesService } from './vehicles/vehicles.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ParksModule } from './parks/parks.module';
import { ParksService } from './parks/parks.service';
import { BrandsModule } from './brands/brands.module';
import { SharedModule } from './shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    DatabaseModule,
    VehiclesModule,
    ParksModule,
    BrandsModule,
  ],
  providers: [AppService, VehiclesService, ParksService, SharedModule],
  exports: [VehiclesService, ParksService, SharedModule],
  controllers: [AppController],
})
export class AppModule {}
