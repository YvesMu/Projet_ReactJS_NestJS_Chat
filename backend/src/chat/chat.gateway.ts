import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from '../auth/constants';

interface ChatMessage {
  userId: number;
  username: string;
  color: string;
  text: string;
}

interface UserInfo {
  id: number;
  username: string;
  color: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, UserInfo>();

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) throw new Error('Token manquant');

      const payload = this.jwtService.verify(token, { secret: jwtConstants.secret });
      const user = await this.userService.findById(payload.sub);
      if (!user) throw new Error('Utilisateur non trouvé');

      this.clients.set(client.id, {
        id: user.id,
        username: user.username,
        color: user.color || '#000000',
      });

      console.log(`✅ Connecté: ${user.username}`);
      this.broadcastUsers();
    } catch (error) {
      console.log('⛔ Connexion refusée:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = this.clients.get(client.id);
    if (user) {
      console.log(`🔌 Déconnecté: ${user.username}`);
      this.clients.delete(client.id);
      this.broadcastUsers();
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() text: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.clients.get(client.id);
    if (!user) return;

    const message: ChatMessage = {
      userId: user.id,
      username: user.username,
      color: user.color,
      text,
    };

    this.server.emit('message', message);
  }

  private broadcastUsers() {
    const usersList = Array.from(this.clients.values()).map(user => ({
      username: user.username,
      online: true,
    }));
    this.server.emit('users', usersList);
  }
}
