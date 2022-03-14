import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edge } from './entities/edge.entity';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessagingService } from '../messaging/messaging.service';

@Module({
  imports: [TypeOrmModule.forFeature([Edge]), RabbitMQModule.forRoot(RabbitMQModule, {
    exchanges: [
      {
        name: 'alias-update',
        type: 'fanout',
      },
      {
        name: 'new-channel',
        type: 'fanout',
      },
    ],
    uri: 'amqp://guest:guest@localhost:5672',
  }),],
  exports: [TypeOrmModule],
  providers: [EdgesResolver, EdgesService, MessagingService],
  controllers: []
})
export class EdgesModule {}
