import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './principal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../Menu/Menu';
import Offer from './offres';

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerBehavior, setCustomerBehavior] = useState([]);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [customerPackages, setCustomerPackages] = useState([]);
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

  const fetchCustomerPackages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/packages');
      setCustomerPackages(response.data.eligble_packages);
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
    fetchCustomerPackages();
  }, []);

  // Fonction pour gérer la soumission du formulaire de recherche
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${searchTerm}`);
      const customer = response.data;
      if (customer.subscriber_info.length) {
        fetchCustomerDetails(customer.subscriber_info[0].MSISDN);
        fetchCustomerBehavior(customer.subscriber_info[0].MSISDN);
        fetchCustomerHistory(customer.subscriber_info[0].MSISDN);
        fetchCustomerHistory(customer.eligble_package[0].MSISDN);
      } else {
        setCustomerDetails([]);
        setCustomerBehavior([]);
        setCustomerHistory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour activer une offre
  const handleActivateOffer = (offerId) => {
    // Parcourez les offres recommandées et les offres Internet pour trouver l'offre correspondante
    const updatedRecommendedOffers = recommendedOffers.map((offer) =>
      offer.id === offerId ? { ...offer, activated: true } : offer
    );
    const updatedInternetOffers = internetOffers.map((offer) =>
      offer.id === offerId ? { ...offer, activated: true } : offer
    );

    setRecommendedOffers(updatedRecommendedOffers);
    setInternetOffers(updatedInternetOffers);
  };

  return (
    <div>
      <Menu />
      <img
        src="https://scontent.cdninstagram.com/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=5a057b&_nc_ohc=-7KlQnO2PJ4AX_wtQ_f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.cdninstagram.com&oh=03_AdS6sqoGtonY6PAC8BALoU8O0aYDNaDKU9sJ91phUN2uGg&oe=648DE044"
        alt="Description de l'image"
        className="photo-profil"
      />
      <div id="container">
        <div id="search-form">
          <form onSubmit={handleSearch}>
            <div className="search-container">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Entrer un numéro"
              />
              <span className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </form>
        </div>

        <div className="section-container">
          <div id="customer-details" className="section white-box">
            <h2>Customer Details</h2>
            {/* ... */}

          </div>

          <div id="customer-behavior" className="section white-box">
            <h2>Comportement</h2>
            {/* ... */}
          </div>

          <div id="customer-history" className="section white-box">
            <h2>Historique des activations</h2>
            {/* ... */}
          </div>
        </div>

        <div className="offer-section">
          <div className="offer-box">
            <h2>Offres recommandées</h2>
            {recommendedOffers.map((offer) => (
              <Offer key={offer.id} offer={offer} onActivateOffer={handleActivateOffer} />
            ))}
          </div>

          <div className="offer-box">
            <h2>Offres voix</h2>
            {/* Utilisation de données statiques */}
            {[
              { id: 1, title: 'Voice Offer 1', description: 'Description of voice offer 1', activated: false },
              { id: 2, title: 'Voice Offer 2', description: 'Description of voice offer 2', activated: false },
              { id: 3, title: 'Voice Offer 3', description: 'Description of voice offer 3', activated: false },
            ].map((offer) => (
              <Offer key={offer.id} offer={offer} onActivateOffer={handleActivateOffer} />
            ))}
          </div>

          <div className="offer-box">
            <h2>Offres Internet</h2>
            {internetOffers.map((offer) => (
              <Offer key={offer.id} offer={offer} onActivateOffer={handleActivateOffer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
