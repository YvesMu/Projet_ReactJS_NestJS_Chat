import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { username, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
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
        backgroundColor: '#f3f4f6',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2.5rem',
          borderRadius: '1rem',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', color: '#111827' }}>
          Créer un compte
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="username" style={{ fontWeight: 'bold', color: '#374151' }}>
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ fontWeight: 'bold', color: '#374151' }}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
              }}
            />
          </div>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
