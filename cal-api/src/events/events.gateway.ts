import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Event } from './entities/event.entity';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // You can add more methods if needed
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
  }

  notifyEventStart(event: Event) {
    this.server.emit('eventStarting', event);
    console.log(event);
  }
}
