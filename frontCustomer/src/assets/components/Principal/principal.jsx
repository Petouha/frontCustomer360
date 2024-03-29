import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './principal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../Menu/Menu';
import Offer from './offres';
import { Consultation } from './Consultation';
import { Plaintes } from '../Plaintes/Plaintes';
import { Migration } from '../Migration/Migration';
import ScrollToTopButton from './ScrollToTopButton';

const Principal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerBehavior, setCustomerBehavior] = useState([]);
  const [customerHistory, setCustomerHistory] = useState([]);
  const [customerPackages, setCustomerPackages] = useState([]);
  const [customerConsumption, setCustomerConsumption] = useState([]);
  const [plaintes, setPlaintes] = useState([]);
  const [customerSubTypes, setCustomerSubTypes] = useState([]);
  const [recommendedOffers, setRecommendedOffers] = useState([]);
  const [internetOffers, setInternetOffers] = useState([]);

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

  const internetOffersArray = (array) => {
    const internet = [];
    array.forEach(pkg => {
      if (pkg.packageType === 'DATA') {
        internet.push(pkg);
      }
    });
    return internet;
  }

  const bundleOffersArray = (array) => {
    const bundle = [];
    array.forEach(pkg => {
      if (pkg.packageType === 'BUNDLE') {
        bundle.push(pkg);
      }
    });
    return bundle;
  }
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
      setInternetOffers([]);
      setRecommendedOffers([]);
      setCustomerSubTypes([]);
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
        setCustomerPackages(bundleOffersArray(customer.eligble_packages));
        setCustomerConsumption(customer.subscribers_consumption);
        fetchPlaintes(customer.subscriber_info[0].MSISDN);
        setCustomerSubTypes(customer.subscription_type);
        setInternetOffers(internetOffersArray(customer.eligble_packages));
        setRecommendedOffers([
          { id: 1, title: 'Offer 1', description: 'Description of offer 1', activated: false },
          { id: 2, title: 'Offer 2', description: 'Description of offer 2', activated: false },
          { id: 3, title: 'Offer 3', description: 'Description of offer 3', activated: false },
        ]);
      } else {
        setCustomerDetails([]);
        setCustomerBehavior([]);
        setCustomerHistory([]);
        setCustomerConsumption([]);
        setCustomerPackages([]);
        setRecommendedOffers([]);
        setInternetOffers([]);
        setPlaintes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Menu />
      <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/293558223_1184855078914133_5227506387825766741_n.png?stp=dst-png_s206x206&_nc_cat=104&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeHXCXsHY8fmNrswsgk5mEoTndNUCUxrDtOd01QJTGsO0-8UkQQC1yaPFIm0WXdte0xWgSqbDT2hl8iStNAPtZjy&_nc_ohc=5Y6enf0uVS0AX9dabql&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTalnUwnPc2qanrNteqZYAlnnUwzEPG2eC_qbWw3RgIkQ&oe=64C6C904" alt="Description de l'image" className="photo-profil" />
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
        <div className='consultation' id='consultation'>
          <h2 style={{ textAlign: "center" }}>Consultation</h2>
          <Consultation conso={customerConsumption} packages={customerPackages}>

          </Consultation>
        </div>


        <div id='offre' className="offer-section">
          <div className="offer-box offer-reco">
            <h2>Offres recommandées</h2>
            {recommendedOffers.length > 0 ? (
              recommendedOffers.map((offer) => (
                <Offer key={offer.id} offer={offer} />
              ))
            ) : (
              <h1 style={{ color: "red" }}>Pas de forfaits disponibles.</h1>
            )}
          </div>


          <div className="offer-box offer-voix">
            <h2>Offres voix</h2>
            {customerPackages && customerPackages.length > 0 ? (
              customerPackages.map((offer) => (
                <Offer key={offer.id} offer={offer} MSISDN={customerDetails.MSISDN} />
              ))
            ) : (
              <h1 style={{ color: "red" }}>Pas de forfaits disponibles.</h1>
            )}
          </div>


          <div className="offer-box offer-internet">
            <h2>Offres Internet</h2>
            {internetOffers.length > 0 ? (
              internetOffers.map((offer) => (
                <Offer key={offer.id} offer={offer} />
              ))
            ) : (
              <h1 style={{ color: "red" }}>Pas de forfaits disponibles.</h1>
            )}
          </div>



        </div>

        <div className='migration' id='migration'>
          <h2>Migrations</h2>
          {customerSubTypes && customerSubTypes.length > 0 ? (
            customerSubTypes.map((sub) => (
              <Migration MSISDN={customerDetails.MSISDN} migration={sub} key={sub.id}></Migration>
            ))
          ) : (
            <h1 style={{ color: "red" }}>Pas de migrations disponibles.</h1>
          )}
        </div>

        <div className='plainte' id='plaintes'>
          <h2 style={{ textAlign: "center" }}>Plaintes</h2>
          {
            plaintes && plaintes.length > 0 ? (
              <Plaintes
                plaintes={plaintes} />
            ) : (
              <h1 style={{ color: "red" }}>Pas de plaintes disponibles.</h1>
            )
          }
        </div>

      </div>

      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
};

export default Principal;