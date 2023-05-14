import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './principal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerDetails, setCustomerDetails] = useState({});
  const [customerBehavior, setCustomerBehavior] = useState([]);
  const [customerHistory, setCustomerHistory] = useState([]);

  // Fonction pour récupérer les détails du client à partir de l'API
  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${customerId}`);
      setCustomerDetails(response.data.subscriber_info);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour récupérer le comportement du client à partir de l'API
  const fetchCustomerBehavior = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${customerId}`);
      setCustomerBehavior(response.data.subscriber_behaviour);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour récupérer l'historique du client à partir de l'API
  const fetchCustomerHistory = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/history/${customerId}`);
      setCustomerHistory(response.data);
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
      const response = await axios.get(`http://localhost:8000/api/v1/users?search=${searchTerm}`);
      const customer = response.data[0];
      fetchCustomerDetails(customer.id);
      fetchCustomerBehavior(customer.id);
      fetchCustomerHistory(customer.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Entrer un numero :</label>
        <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
      </form>
      <div className="container">
       <div className="customer-details">
        <h2>Customer Details</h2>
          <p><strong>Nom complet :</strong> {customerDetails.name}</p>
          <p><strong>Téléphone :</strong> {customerDetails.phone}</p>
          <p><strong>Wilaya :</strong> {customerDetails.city}</p>
          <p><strong>Age :</strong> {customerDetails.age}</p>
          <p><strong>Ancienneté :</strong> {customerDetails.seniority}</p>
          <p><strong>NPS :</strong> {customerDetails.nps}</p>
          <p><strong>Sexe :</strong> {customerDetails.gender}</p>
          <p><strong>Souscription :</strong> {customerDetails.subscription}</p>
          <p><strong>Réseau :</strong> {customerDetails.network}</p>
          <p><strong>Type SIM :</strong> {customerDetails.simType}</p>
          <p><strong>Etat :</strong> {customerDetails.status}</p>
        </div>
      </div>
  
        


      <div className="customer-behavior">
        <h2>Customer Behavior</h2>
        <div className="customer-behavior-details">
          <p><strong>Balance :</strong> {customerBehavior.balance}</p>
          <p><strong>Segment :</strong> {customerBehavior.segment}</p>
          <p><strong>Comportement :</strong> {customerBehavior.comportement}</p>
          <p><strong>Détails :</strong> {customerBehavior.details}</p>
          <p><strong>Epaiment :</strong> {customerBehavior.epaiment}</p>
        </div>
        <ul>
          {customerBehavior.map((item) => (
            <li key={item.id}>{item.action} - {item.date}</li>
          ))}
        </ul>
      </div>
      <div className="customer-history">
        <h2>Customer History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            {customerBehavior.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.action}</td>
                <td>{item.montant}</td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>     
    </div>
   
  )}; 


  export default Principal;
