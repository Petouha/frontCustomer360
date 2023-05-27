  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './principal.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';

  const Principal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customerDetails, setCustomerDetails] = useState(null);
    const [customerBehavior, setCustomerBehavior] = useState([]);
    const [customerHistory, setCustomerHistory] = useState([]);

    // Fonction pour récupérer les détails du client à partir de l'API
    const fetchCustomerDetails = async (customerId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${customerId}`);
        
        setCustomerDetails(response.data.subscriber_info[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Fonction pour récupérer le comportement du client à partir de l'API
    const fetchCustomerBehavior = async (customerId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${customerId}`);
        setCustomerBehavior(response.data.subscriber_behaviour[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Fonction pour récupérer l'historique du client à partir de l'API
    const fetchCustomerHistory = async (customerId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${customerId}`);
        console.log(response.data.history);
        setCustomerHistory(response.data.history[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Effet pour récupérer les détails du client au chargement de la page
    useEffect(() => {
      fetchCustomerDetails(1);
      fetchCustomerBehavior(1);
      fetchCustomerHistory(1);
    }, []);

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${searchTerm}`);
        const customer = response.data;
        
        fetchCustomerDetails(customer.subscriber_info[0].MSISDN);
        fetchCustomerBehavior(customer.subscriber_info[0].MSISDN);
        fetchCustomerHistory(customer.subscriber_info[0].MSISDN);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>    <img src="https://scontent.cdninstagram.com/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=5a057b&_nc_ohc=-7KlQnO2PJ4AX_wtQ_f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=03_AdS6sqoGtonY6PAC8BALoU8O0aYDNaDKU9sJ91phUN2uGg&oe=648DE044" alt="Description de l'image" className="photo-profil"></img>
        <div id="container">
          <div id="search-form">
            <form onSubmit={handleSearch}>
              <div className="search-container">
                <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Entrer un numéro" />
                <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
              </div>

            </form>
          </div>

          <div className="section-container">
            <div id="customer-details" className="section white-box">
              <h2>Customer Details</h2>
              <p><strong>Nom complet :</strong> {customerDetails.fullName || "NaN"}</p>
              {/* <p><strong>Téléphone :</strong> {customerDetails.phone}</p>
              <p><strong>Wilaya :</strong> {customerDetails.city}</p>
              <p><strong>Age :</strong> {customerDetails.age}</p>
              <p><strong>Ancienneté :</strong> {customerDetails.seniority}</p>
              <p><strong>NPS :</strong> {customerDetails.nps}</p>
              <p><strong>Sexe :</strong> {customerDetails.gender}</p>
              <p><strong>Souscription :</strong> {customerDetails.subscription}</p>
              <p><strong>Réseau :</strong> {customerDetails.network}</p>
              <p><strong>Type SIM :</strong> {customerDetails.simType}</p>
              <p><strong>Etat :</strong> {customerDetails.status}</p> */}
            </div>





            <div id="customer-behavior" className="section white-box">
              <h2>Customer Behavior</h2>
              <div className="customer-behavior-details">
                {/* <p><strong>Balance :</strong> {customerBehavior.balance}</p>
                <p><strong>Segment :</strong> {customerBehavior.segment}</p>
                <p><strong>Comportement :</strong> {customerBehavior.comportement}</p>
                <p><strong>Détails :</strong> {customerBehavior.details}</p>
                <p><strong>Epaiment :</strong> {customerBehavior.epaiment}</p> */}
              </div>
              {/* <ul>
                {customerBehavior.map((item) => (
                  <li key={item.id}>{item.action} - {item.date}</li>
                ))}
              </ul> */}
            </div>
            <div id="customer-history" className="section white-box">
              <h2>Customer History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction</th>
                    <th>Montant</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {customerBehavior.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.action}</td>
                      <td>{item.montant}</td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>

    )
  };


  export default Principal;
