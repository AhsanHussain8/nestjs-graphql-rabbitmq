import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EdgesModule } from './edges/edges.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5438,
      username: 'edge',
      password: 'postgres',
      database: 'edge',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    EdgesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
