By: Ahsan Hussain

# Description

A GraphQL API built with NestJS. The API can preform simple CRUD operations into a Postgres database. Furthermore, messages are sent to and from a RabbitMQ instance.

# Dependencies
 - node
 - npm
 - docker
 - docker-compose


# Starting Postgres and RabbitMQ
From the root directory, run the following command:
`docker-compose up`

# Starting the API
Navigate to the `backend` directory and run the following commands: 
`npm i`
`npm run start:dev`	
Visit http://localhost:3000/graphql to use the GraphQL API and to create edges. 


# Sending Messages from RabbitMQ
The API has a RabbitMQ message handler. To send an update alias message, navigate to http://localhost:15672/#/exchanges/%2F/alias-update. The handler is accepting messages on this exchange with `routing-key` empty. The payload  is in JSON format with the schema: 

    {
      node1_alias: String,
      node2_alias: String,
      id: Int
    }
The payload must be valid for the handler to receive the message. 

##. Other Notes 
The `alias-update` exchange needs to be bound to the `alias-update-queue` in order for the queue to receive messages.
The `new-channel` exchange needs to be bound to the `new-channel-queue` in order for the queue to receive messages.  