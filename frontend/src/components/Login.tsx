import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/chat');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Échec de connexion.');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '3rem 2rem',
          borderRadius: 12,
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          width: '90%',
          maxWidth: 500,
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2
            style={{
              fontSize: 28,
              marginBottom: 32,
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            Connexion
          </h2>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontWeight: 500,
                color: 'black',
              }}
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '95%',
                padding: '12px 14px',
                border: '1px solid #ccc',
                borderRadius: 7,
                fontSize: 15,
                color: 'black',
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontWeight: 500,
                color: 'black',
              }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '95%',
                padding: '12px 14px',
                border: '1px solid #ccc',
                borderRadius: 6,
                fontSize: 15,
                color: 'black',
              }}
            />
          </div>

          {error && (
            <p style={{ color: 'red', marginBottom: 20, fontSize: 13 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 0',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Se connecter
          </button>

          <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: 14 }}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
