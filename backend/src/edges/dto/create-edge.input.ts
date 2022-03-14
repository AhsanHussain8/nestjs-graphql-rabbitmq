import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEdgeInput {
  @Field()
  @IsNotEmpty()
  node1_alias: string;

  @Field()
  @IsNotEmpty()
  node2_alias: string;
}
