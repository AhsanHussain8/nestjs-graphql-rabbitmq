import { Controller } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

@Controller()
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  
}