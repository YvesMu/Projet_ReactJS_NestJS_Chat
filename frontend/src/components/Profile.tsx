import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function Profile() {
  const [color, setColor] = useState('#000000');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const res = await axios.get('/user/color', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setColor(res.data.color || '#000000');
      } catch (err) {
        console.error('Erreur en récupérant la couleur', err);
      } finally {
        setLoading(false);
      }
    };
    fetchColor();
  }, [token]);

  const handleChangeColor = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setMessage('');
  };

  const handleSave = async () => {
    try {
      await axios.put(
        '/user/color',
        { color },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage('Couleur sauvegardée !');
    } catch (err) {
      setMessage('Erreur lors de la sauvegarde.');
      console.error(err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Profil utilisateur</h2>
      <label>
        Choisir la couleur de ton profil :
        <input type="color" value={color} onChange={handleChangeColor} style={{ marginLeft: '1rem' }} />
      </label>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave}>Sauvegarder</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}
