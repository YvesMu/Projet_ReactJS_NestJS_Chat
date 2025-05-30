import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Header from './components/Header';
import PrivateRoute from './routes/PrivateRoute';
import Register from './components/Register';

function LayoutWithHeader({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hiddenHeaderRoutes = ['/login', '/register'];
  const showHeader = !hiddenHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWithHeader>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </LayoutWithHeader>
    </Router>
  );
}
