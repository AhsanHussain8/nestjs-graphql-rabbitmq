import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { maxHeaderSize } from 'http';
import { UpdateEdgeInput } from 'src/edges/dto/update-edge.input';
import { EdgesService } from 'src/edges/edges.service';

@Injectable()
export class MessagingService {
  constructor(private readonly edgesService: EdgesService) {}
  @RabbitSubscribe({
    exchange: 'alias-update',
    routingKey: '',
    queue: 'alias-update-queue',
  })
  
  public async pubSubHandler(msg: {}) {
    let edgeUpdate = new UpdateEdgeInput();

    if ("id" in msg) {
        edgeUpdate.id = msg["id"];
    }
    else {
        console.log("No id found for alias-update");
        return
    }
    
    if ("node1_alias" in msg) {
        if (msg["node1_alias"] != "") {
            edgeUpdate.node1_alias = msg["node1_alias"];
            console.log(`node1_alias = ${edgeUpdate.node1_alias}`)
        }
    }

    if ("node2_alias" in msg) {
        if (msg["node2_alias"] != "") {
            edgeUpdate.node2_alias = msg["node2_alias"];
            console.log(`node2_alias = ${edgeUpdate.node2_alias}`)
        }
    }
    
    
    await this.edgesService.update(msg["id"], edgeUpdate);
  }
}