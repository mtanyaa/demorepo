import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSignup(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoggedIn ? (
        <Welcome onLogout={handleLogout} />
      ) : isSignup ? (
        <Signup onToggle={toggleForm} onSignup={handleLogin} />
      ) : (
        <Login onToggleSignup={toggleForm} onLogin={handleLogin} />
      )}
    </>
  );
}
