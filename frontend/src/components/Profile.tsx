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

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setMessage('✅ Couleur sauvegardée !');
    } catch (err) {
      setMessage('❌ Erreur lors de la sauvegarde.');
      console.error(err);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Chargement...</p>;

  return (
    <div
      style={{
        minHeight: '90vh',
        width: '100vw',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '3rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#111827', textAlign: 'center' }}>
          Mon Profil
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label
            htmlFor="color"
            style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#374151', fontSize: '1.1rem' }}
          >
            Choisir la couleur de ton profil :
          </label>

          <input
            type="color"
            id="color"
            value={color}
            onChange={handleChangeColor}
            style={{
              width: '80px',
              height: '80px',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            }}
          />

          <button
            onClick={handleSave}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Sauvegarder
          </button>

          {message && (
            <p
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                fontWeight: 'bold',
                color: message.startsWith('✅') ? 'green' : 'red',
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
