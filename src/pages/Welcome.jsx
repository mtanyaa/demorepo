import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Form from "./Form";

export default function Welcome({ onLogout }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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

  const handleFormSubmit = (formData) => {
    setUserInfo(formData);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  if (!user) {
    return (
      <div className="welcome-container">
        <p>Loading user info...</p>
      </div>
    );
  }

  if (showForm) {
    return <Form onSubmit={handleFormSubmit} onCancel={handleCancelForm} />;
  }

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to HPE</h1>
        
        <div className="user-info">
          <h2>Hello, {user.email}!</h2>
          
          <div className="user-details">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Created:</strong> {user.metadata.creationTime}</p>
            <p><strong>Last Sign In:</strong> {user.metadata.lastSignInTime}</p>
          </div>
        </div>

        {userInfo && (
          <div className="submitted-info">
            <h3>Your Information:</h3>
            <p><strong>Name:</strong> {userInfo.fullName}</p>
            <p><strong>Age:</strong> {userInfo.age}</p>
            {userInfo.phone && <p><strong>Phone:</strong> {userInfo.phone}</p>}
            {userInfo.profession && <p><strong>Profession:</strong> {userInfo.profession}</p>}
            {userInfo.bio && <p><strong>Bio:</strong> {userInfo.bio}</p>}
          </div>
        )}

        <div className="welcome-message">
          <p>You are successfully logged in to your account.</p>
          <p>You can now access all features of the application.</p>
        </div>

        <div className="welcome-buttons">
          <button 
            onClick={() => setShowForm(true)}
            className="form-btn"
          >
            {userInfo ? "Update Information" : "Complete Your Profile"}
          </button>

          <button 
            onClick={handleLogout}
            disabled={loading}
            className="logout-btn"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}