  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './principal.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  import { Menu } from '../Menu/Menu';

  const Principal = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [customerDetails, setCustomerDetails] = useState([]);
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
        console.log(response);
        setCustomerBehavior(response.data.subscriber_behaviour[0]);
      } catch (error) {
        console.log(error);
      }
    };

    // Fonction pour récupérer l'historique du client à partir de l'API
    const fetchCustomerHistory = async (customerId) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${searchTerm}`);
        console.log(response.data.history);
        setCustomerHistory(response.data.history);
      } catch (error) {
        console.log(error);
      }
    };

    // Effet pour récupérer les détails du client au chargement de la page
    useEffect(() => {
      fetchCustomerDetails(searchTerm);
      fetchCustomerBehavior(searchTerm);
      fetchCustomerHistory(searchTerm);
    }, []);

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/${searchTerm}`);
        const customer = response.data;
        console.log(customer);
        if(customer.subscriber_info.length)
        {
          fetchCustomerDetails(customer.subscriber_info[0].MSISDN);
        fetchCustomerBehavior(customer.subscriber_info[0].MSISDN);
        fetchCustomerHistory(customer.subscriber_info[0].MSISDN);
      }
        else{
          setCustomerDetails([]);
          setCustomerBehavior([]);
          setCustomerHistory([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <Menu/>
        <img src="https://scontent.cdninstagram.com/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=5a057b&_nc_ohc=-7KlQnO2PJ4AX_wtQ_f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=03_AdS6sqoGtonY6PAC8BALoU8O0aYDNaDKU9sJ91phUN2uGg&oe=648DE044" alt="Description de l'image" class="photo-profil"></img>
        <div id="container">
          <div id="search-form">
            <form onSubmit={handleSearch}>
              <div class="search-container">
                <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Entrer un numéro" />
                <span class="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
              </div>

            </form>
          </div>

          <div class="section-container">
            <div id="customer-details" class="section white-box">
              <h2>Customer Details</h2>
              <p><strong>Nom complet :</strong> {customerDetails.fullName}</p>
              <p><strong>Téléphone :</strong> {customerDetails.MSISDN}</p>
              <p><strong>Wilaya :</strong> {customerDetails.wilaya}</p>
              <p><strong>Age :</strong> {customerDetails.Age}</p>
              <p><strong>Ancienneté :</strong> {customerDetails.Seniority}</p>
              <p><strong>NPS :</strong> {customerDetails.nps}</p>
              <p><strong>Sexe :</strong> {customerDetails.sex}</p>
              <p><strong>Souscription :</strong> {customerDetails.Subscriptions_Type}</p>
              <p><strong>Réseau :</strong> {customerDetails.lineType}</p>
              <p><strong>Type SIM :</strong> {customerDetails.simType}</p>
              <p><strong>Etat :</strong> {customerDetails.status}</p>
            </div>





            <div id="customer-behavior" class="section white-box">
              <h2>Customer Behavior</h2>
              <div class="customer-behavior-details">
                <p><strong>Balance :</strong> {customerBehavior.balance}</p>
                <p><strong>Segment :</strong> {customerBehavior.valueSegment}</p>
                <p><strong>Comportement :</strong> {customerBehavior.behaviorSegments}</p>
                <p><strong>Détails :</strong> {customerBehavior.details}</p>
                <p><strong>Epaiment :</strong> {customerBehavior.epaiment}</p>
              </div>
              {/* <ul>
                {customerHistory.map((item) => (
                  <li key={item.id}>{item.action} - {item.date}</li>
                ))}
              </ul> */}
            </div>
            <div id="customer-history" class="section white-box">
              <h2>Customer History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Forfait</th>
                  </tr>
                </thead>
                <tbody>
                  {customerHistory && customerHistory.length > 0 ? (
                    customerHistory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.dateActivation}</td>
                        <td>{item.commercialName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No customer history available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    )
  };


  export default Principal;
