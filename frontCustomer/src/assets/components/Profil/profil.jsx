import React, { useState, useEffect } from 'react';
import './profil.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API call with static data
    const fetchUser = async () => {
      try {
        // Replace this with your static user data
        const staticUser = {
          logo: 'path/to/userLogo.png',
          photo: 'path/to/userPhoto.png',
          totalAppel: 10,
          migration: 5,
          activation: 3,
          AppelReport: [
            {
              id: 1,
              action: 'migration',
              date: '2023-05-02',
              name: 'John Doe',
              montant: 2
            },
            {
              id: 1,
              action: 'migration',
              date: '2023-05-02',
              name: 'John Doe',
              montant: 2 
            }
          ],
          name: 'John Doe',
          lastLogin: '2023-05-03',
          isLoggedIn: true
        };

        setUser(staticUser);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="side-section">
        <img src={user.logo} alt="User Logo" />
        <div className="labels">
          <p>Profil</p>
          <p>Stats</p>
          <p>Rapport Agent</p>
        </div>
      </div>
      <div className="main-section">
        <h1>User Table</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.lastLogin}</td>
              <td>{user.isLoggedIn ? 'Connected' : 'Not Connected'}</td>
            </tr>
          </tbody>
        </table>
        <h1>Statistique</h1>
        <p>Activation: {user.activation}</p>
        <p>Migration: {user.migration}</p>
      
        <h1>Rapport Agent</h1>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
              <th>nom client</th>
              <th>montant</th>
            </tr>
          </thead>
          <tbody>
            {user.AppelReport.map((report) => (
              <tr key={report.id}>
                <td>{report.date}</td>
                <td>{report.migration}</td>
                <td>{report.activation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
