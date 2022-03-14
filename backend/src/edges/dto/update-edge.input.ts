import { CreateEdgeInput } from './create-edge.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEdgeInput extends PartialType(CreateEdgeInput) {
  @Field(() => Int)
  id: number;
}
