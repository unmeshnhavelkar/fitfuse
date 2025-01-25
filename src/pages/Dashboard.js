import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/header';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username); // Store the username
          }
        } catch (err) {
          setError('Error fetching user data');
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Header username={username} /> {/* Pass username to Header */}
      <div>
        {error && <p>{error}</p>}
        <h1>Welcome to your Dashboard</h1>
        {/* Other dashboard content */}
      </div>
    </div>
  );
};

export default Dashboard;
