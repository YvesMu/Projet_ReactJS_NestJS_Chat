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
    <div style={{ padding: '2rem' }}>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
