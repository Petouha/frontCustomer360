import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profil.css';




const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users');
        setUser(response.data);
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
    <div>
      <div>
        <img src={user.png} alt="User Logo" />
        <img src={user.png} alt="User Photo" />
      </div>
      <h1>Statistique </h1>
      <p>Activation: {user.activation}</p>
      <p>Migration: {user.migration}</p>
      
      <h1>rapport agent</h1>
      <ul>
        {user.AppelReport.map((report) => (
          <li key={report.id}>
            <p>Date: {report.date}</p>
            <p>Migration: {report.migration}</p>
            <p>Date: {report.date}</p>
            <p>Activation: {report.activation}</p>
          </li>
        ))}
      </ul>
      <h1>User Table</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Matricule</th>
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
    </div>
  );
};

export default UserPage;