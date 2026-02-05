import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Welcome({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      onLogout();
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="welcome-container">
        <p>Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome! 🎉</h1>
        
        <div className="user-info">
          <h2>Hello, {user.email}!</h2>
          
          <div className="user-details">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Created:</strong> {user.metadata.creationTime}</p>
            <p><strong>Last Sign In:</strong> {user.metadata.lastSignInTime}</p>
          </div>
        </div>

        <div className="welcome-message">
          <p>You are successfully logged in to your account.</p>
          <p>You can now access all features of the application.</p>
        </div>

        <button 
          onClick={handleLogout}
          disabled={loading}
          className="logout-btn"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}