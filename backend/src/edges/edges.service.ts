import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';
import { Edge } from "./entities/edge.entity"
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

@Injectable()
export class EdgesService {
  constructor(
    @InjectRepository(Edge) private edgesRepository: Repository<Edge>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(createEdgeInput: CreateEdgeInput): Promise<Edge> {
    let edge = this.edgesRepository.create(createEdgeInput);
    edge.capacity = getRandomInt(10000, 1000000)
    try {
      const message = `New channel between ${edge.node1_alias} and ${edge.node2_alias} with a capacity of ${edge.capacity} has been created.`;
      this.amqpConnection.publish("new-channel", "", message);
      console.log(message);
      
    }
    catch (error){
      console.log(error);
    }
    return this.edgesRepository.save(edge)
  }

  async findAll(): Promise<Edge[]> {
    return this.edgesRepository.find();
  }

  async findOne(id: number): Promise<Edge> {
    return this.edgesRepository.findOne(id);
  }

  async update(id: number, updateEdgeInput: UpdateEdgeInput): Promise<Edge> {
    let partialEdge = updateEdgeInput;
    partialEdge.id = id;
    const edge = await this.edgesRepository.preload(partialEdge);
    
    return this.edgesRepository.save(edge);
    
  }

  async remove(id: number): Promise<Edge>{
    let edge = this.edgesRepository.findOne(id);
    await this.edgesRepository.delete(id);
    return edge;
  }
}
