import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './principal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../Menu/Menu';
import Offer from './offres';
import { Consultation } from './Consultation';
import { Plaintes } from '../Plaintes/Plaintes';

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerBehavior, setCustomerBehavior] = useState([]);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [customerPackages, setCustomerPackages] = useState([]);
  const [customerConsumption, setCustomerConsumption] = useState([]);
  const [plaintes, setPlaintes] = useState([]);
  const [recommendedOffers, setRecommendedOffers] = useState([
    { id: 1, title: 'Offer 1', description: 'Description of offer 1', activated: false },
    { id: 2, title: 'Offer 2', description: 'Description of offer 2', activated: false },
    { id: 3, title: 'Offer 3', description: 'Description of offer 3', activated: false },
  ]);

  const [internetOffers, setInternetOffers] = useState([
    { id: 1, title: 'Internet Offer 1', description: 'Description of internet offer 1', activated: false },
    { id: 2, title: 'Internet Offer 2', description: 'Description of internet offer 2', activated: false },
    { id: 3, title: 'Internet Offer 3', description: 'Description of internet offer 3', activated: false },
  ]);

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

  const fetchPlaintes = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/reclamations/${searchTerm}`
      );
      setPlaintes(response.data);

    } catch (error) {
      console.error("Error fetching plaintes:", error);
    }
  };

  // Fonction pour récupérer l'historique du client à partir de l'API
  const fetchCustomerHistory = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${searchTerm}`);
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
    fetchPlaintes(searchTerm);
  }, []);

  // Fonction pour gérer la soumission du formulaire de recherche
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      // Clear all data
      setCustomerDetails([]);
      setCustomerBehavior([]);
      setCustomerHistory([]);
      setCustomerConsumption([]);
      setCustomerPackages([]);
      setPlaintes([]);
      localStorage.removeItem("MSISDN");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${searchTerm}`);
      const customer = response.data;
      console.log(customer);
      if (customer.subscriber_info.length) {
        fetchCustomerDetails(customer.subscriber_info[0].MSISDN);
        fetchCustomerBehavior(customer.subscriber_info[0].MSISDN);
        fetchCustomerHistory(customer.subscriber_info[0].MSISDN);
        setCustomerPackages(customer.eligble_packages);
        setCustomerConsumption(customer.subscribers_consumption);
        fetchPlaintes(customer.subscriber_info[0].MSISDN);

      } else {
        setCustomerDetails([]);
        setCustomerBehavior([]);
        setCustomerHistory([]);
        setCustomerConsumption([]);
        setCustomerPackages([]);
        setPlaintes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Menu />
      <img src="https://scontent.cdninstagram.com/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=5a057b&_nc_ohc=-7KlQnO2PJ4AX_wtQ_f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=03_AdS6sqoGtonY6PAC8BALoU8O0aYDNaDKU9sJ91phUN2uGg&oe=648DE044" alt="Description de l'image" className="photo-profil" />
      <div id="container">
        <div id="search-form">
          <form onSubmit={handleSearch}>
            <div className="search-container">
              <input type="text" id="search" className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Entrer un numéro" />

            </div>
          </form>
        </div>

        <div className="section-container">
          <div id="customer-details" className="section white-box">
            <h2>Customer Details</h2>
            <p><strong>Nom complet :</strong><span className="input-field"> {customerDetails.fullName}</span></p>
            <p><strong>Téléphone :</strong> <span className="input-field">{customerDetails.MSISDN}</span> </p>
            <p><strong>Wilaya :</strong> <span className="input-field">{customerDetails.wilaya}</span></p>
            <p><strong>Age :</strong> <span className="input-field">{customerDetails.Age}</span></p>
            <p><strong>Ancienneté :</strong> <span className="input-field">{customerDetails.Seniority}</span></p>
            <p><strong>NPS :</strong> <span className="input-field">{customerDetails.nps}</span></p>
            <p><strong>Sexe :</strong> <span className="input-field">{customerDetails.sex}</span></p>
            <p><strong>Souscription :</strong><span className="input-field"> {customerDetails.Subscriptions_Type}</span></p>
            <p><strong>Réseau :</strong><span className="input-field"> {customerDetails.lineType}</span></p>
            <p><strong>Type SIM :</strong><span className="input-field"> {customerDetails.simType}</span></p>
            <p><strong>Etat :</strong> <span className="input-field">{customerDetails.status}</span></p>
          </div>

          <div id="customer-behavior" className="section white-box">
            <h2>Comportement</h2>
            <div className="customer-behavior-details">
              <p><strong>Balance :</strong> <span className="input-field-b">{customerBehavior.balance}</span></p>
              <p><strong>Segment :</strong> <span className="input-field-b">{customerBehavior.valueSegment}</span></p>
              <p><strong>Comportement :</strong> <span className="input-field-b">{customerBehavior.behaviorSegments}</span></p>
              <p><strong>Détails :</strong> <span className="input-field-b"> {customerBehavior.details}</span></p>
              <p><strong>Epaiment :</strong><span className="input-field-b"> {customerBehavior.epaiment}</span></p>
            </div>
          </div>

          <div id="customer-history" className="section white-box">
            <h2>Historique des activations</h2>
            <div className='table-container'>
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
        <div className='consultation'>
          <h2 style={{ textAlign: "center" }}>Consultation</h2>
          <Consultation conso={customerConsumption} packages={customerPackages}>

          </Consultation>
        </div>


        <div id='offre' className="offer-section">
          <div className="offer-box">
            <h2>Offres recommandées</h2>
            {recommendedOffers.map((offer) => (
              <Offer key={offer.id} offer={offer} />
            ))}
          </div>

          <div className="offer-box offer-voix">
            <h2>Offres voix</h2>
            {/* Utilisation de données statiques */}
            {customerPackages.map((offer) => (
              <Offer key={offer.id} offer={offer} MSISDN={customerDetails.MSISDN} />
            ))}
          </div>

          <div className="offer-box">
            <h2>Offres Internet</h2>
            {internetOffers.map((offer) => (
              <Offer key={offer.id} offer={offer} />
            ))}
          </div>
        </div>

        <div className='plainte'>
          <div>
            <Plaintes
              plaintes={plaintes}
            ></Plaintes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;

