import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors: {
    origin: '*', // allow frontend
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients: Map<string, Socket> = new Map(); // userId -> socket

  handleConnection(socket: Socket) {
    const token = socket.handshake.auth?.token;

    try {
      if (!process.env.JWT_SECRET) {
        console.log('JWT_SECRET is not defined. Disconnecting...');
        socket.disconnect();
        return;
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);

      console.log("payload",payload)
      const userId = typeof payload.sub === 'string' ? payload.sub : undefined;

      console.log(userId, 'user');

      if (userId) {
        socket.data.user = payload; // Attach to socket
        this.clients.set(userId, socket);
        console.log(`User ${userId} connected via socket`);
      } else {
        console.log('User ID is undefined or not a string. Disconnecting...');
        socket.disconnect();
      }
    } catch (err) {
      console.log('Invalid socket token. Disconnecting...');
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    console.log("DISCONNECT")
    console.log(socket.data)
    const user = socket.data.user.username;
    if (user) {
      this.clients.delete(user);
      console.log(`User ${user} disconnected`);
    }
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() msg: string, @ConnectedSocket() socket: Socket) {
    const user = socket.data.user.username;
    const response= {
      message:"Hello"
    }
    socket.emit('pong', response);
    return;
  }

  emitToUser(userId: string, event: string, payload: any) {
    const socket = this.clients.get(userId);
    if (socket) {
      socket.emit(event, payload);
    }
  }
}
