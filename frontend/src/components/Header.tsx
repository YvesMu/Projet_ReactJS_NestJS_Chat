import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header
      style={{
        backgroundColor: '#1e293b',
        padding: '1rem 2rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '1.5rem' }}>MonApp</h1>
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/chat" style={{ color: 'white', textDecoration: 'none' }}>Chat</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profil</Link>
        <button
          onClick={logout}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
}
