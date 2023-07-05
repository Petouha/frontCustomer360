import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profil.css';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userReport, setUserReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let isLoggedIn;
  useEffect(() => {
    // Simulating API call with static data
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.post(`http://localhost:8000/api/v1/employees/info`, { email });
        console.log(response.data.user_info[0]);
        // Replace this with your static user data
        // const staticUser = {
        //   logo: 'path/to/userLogo.png',
        //   photo: 'path/to/userPhoto.png',
        //   totalAppel: 10,
        //   migration: 5,
        //   activation: 3,
        //   AppelReport: [
        //     {
        //       id: 1,
        //       action: 'migration',
        //       date: '2023-05-02',
        //       name: 'John Doe',
        //       montant: 2
        //     },
        //     {
        //       id: 1,
        //       action: 'migration',
        //       date: '2023-05-02',
        //       name: 'John Doe',
        //       montant: 2
        //     }
        //   ],
        //   name: 'John Doe',
        //   lastLogin: '2023-05-03',
        //   isLoggedIn: true
        // };

        setUser(response.data.user_info[0]);
        setUserReport(response.data.sales)
        setLoading(false);
        isLoggedIn = true;
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
      <a href="http://localhost:5173/principal">
        <img src="https://seeklogo.com/images/D/djezzy-logo-A1B6F6E26F-seeklogo.com.png" alt="Description de l'image" className="photo-profil" />
      </a>
      <div className="side-section">
        <img src="https://cdn-icons-png.flaticon.com/512/20/20698.png" alt="User Logo" className="photodeprofil" />

        <div className="labels">
          <p>Profil</p>
          <p>Stats</p>
          <p>Rapport Agent</p>
        </div>
      </div>
      <div className="user-info">
        <h1>Table Agent</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Dernière connexion</th>


            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.firstName + " " + user.lastName}</td>
              <td>{user.previousLogin}</td>



            </tr>
          </tbody>
        </table>
        <h1>Statistique</h1>
        <div className="stats-table">

          <table>
            <tbody>
              <tr>
                <td>Activation:</td>
                <td>{user.activation}</td>
              </tr>
              <tr>
                <td>Migration:</td>
                <td>{user.migration}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h1>Rapport Agent</h1>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Date</th>
              <th>nom</th>
              <th>montant</th>
            </tr>
          </thead>
          <tbody>
            {userReport.map((report) => (
              <tr key={report.id}>
                <td>{report.saleType}</td>
                <td>{report.dateSale}</td>
                <td>{report.fullName
                }</td>
                <td>{report.price}</td>
              </tr>

            ))}
          </tbody>

        </table>

      </div>
    </div>

  );
};

export default UserPage;
