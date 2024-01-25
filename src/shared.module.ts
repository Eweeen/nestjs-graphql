import { PubSub } from 'graphql-subscriptions';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class SharedModule {}
