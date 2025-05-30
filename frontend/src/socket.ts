import { io, Socket } from 'socket.io-client';

// Supposons que tu récupères le token JWT depuis le localStorage (après login)
const token = localStorage.getItem('token');

export const socket: Socket = io('http://localhost:3000', {
  auth: {
    token,
  },
  // Optionnel, si besoin de configurer le CORS, etc.
});
