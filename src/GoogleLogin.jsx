// GoogleLogin.js
import React from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // You can send user info to your backend if needed
      console.log("User Info:", user);
      // Save in localStorage or Context API if needed
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <button onClick={handleLogin} style={{
      backgroundColor: '#4285F4',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    }}>
      Register with Google
    </button>
  );
};

export default GoogleLogin;
