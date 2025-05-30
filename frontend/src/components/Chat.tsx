import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from '../api/axios';

interface Message {
  userId: number;
  username: string;
  text: string;
  color: string;
}

interface UserStatus {
  username: string;
  online: boolean;
}

let socket: Socket;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [color, setColor] = useState('#000000');
  const [users, setUsers] = useState<UserStatus[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user/color', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
        setColor(res.data.color || '#000000');
      } catch (err) {
        console.error('Erreur utilisateur', err);
      }
    };

    fetchUser();

    socket = io('http://localhost:3000', {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Connecté au chat');
    });

    socket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('users', (connectedUsers: UserStatus[]) => {
      setUsers(connectedUsers);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const changeColor = async (newColor: string) => {
    setColor(newColor);
    try {
      await axios.put(
        '/user/color',
        { color: newColor },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Erreur lors du changement de couleur', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#e5e7eb',
      }}
    >
      {/* Colonne gauche : utilisateurs */}
      <div
        style={{
          width: '250px',
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#111' }}>
          Utilisateurs
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {users.map((user, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.75rem',
                color: user.username === username ? '#2563eb' : '#111',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  marginRight: '8px',
                  backgroundColor: user.online ? 'green' : 'gray',
                }}
              />
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Partie droite : Chat */}
      <div
        style={{
          flex: 1,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2
            style={{
              fontSize: '1.8rem',
              color: '#333',
              marginBottom: '0.5rem',
            }}
          >
            Chat
          </h2>
          <label
            htmlFor="colorPicker"
            style={{
              fontWeight: 'bold',
              fontSize: '1rem',
              marginRight: '10px',
              color: 'black',
            }}
          >
            Couleur du texte :
          </label>
          <input
            type="color"
            id="colorPicker"
            value={color}
            onChange={(e) => changeColor(e.target.value)}
            style={{
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              border: 'none',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              verticalAlign: 'middle',
            }}
          />
        </div>

        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {messages.map((msg, index) => {
            const isMe = msg.username === username;
            return (
              <div
                key={index}
                style={{
                  alignSelf: isMe ? 'flex-start' : 'flex-end',
                  backgroundColor: '#f5f7ff',
                  borderRadius: 12,
                  padding: '8px 12px',
                  maxWidth: '75%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  color: msg.color,
                  textAlign: isMe ? 'left' : 'right',
                }}
              >
                <strong>{msg.username}</strong> : <span>{msg.text}</span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Écrire un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            style={{
              flexGrow: 1,
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#1e40af')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#2563eb')
            }
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
