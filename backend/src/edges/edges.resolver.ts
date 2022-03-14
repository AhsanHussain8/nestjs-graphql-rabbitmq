import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EdgesService } from './edges.service';
import { Edge } from './entities/edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Resolver(() => Edge)
export class EdgesResolver {
  constructor(private readonly edgesService: EdgesService) {}

  @Mutation(() => Edge, { name: 'createEdge' })
  createEdge(@Args('createEdgeInput') createEdgeInput: CreateEdgeInput) {
    return this.edgesService.create(createEdgeInput);
  }

  @Query(() => [Edge], { name: 'getEdges', nullable:'items' })
  findAll() {
    return this.edgesService.findAll();
  }

  @Query(() => Edge, { name: 'getEdge', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.edgesService.findOne(id);
  }

  @Mutation(() => Edge)
  updateEdge(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    return this.edgesService.update(updateEdgeInput.id, updateEdgeInput);
  }

  @Mutation(() => Edge)
  removeEdge(@Args('id', { type: () => Int }) id: number) {
    return this.edgesService.remove(id);
  }
}
