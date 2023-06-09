import React from 'react';
import axios from 'axios';
const Offer = ({ offer, MSISDN }) => {
  const handleActivateOffer = () => {
    // Appeler la fonction onActivateOffer avec l'offre en tant que paramètre
    const confirmed = window.confirm("Etes vous sûrs de vouloir activer ce forfait?");
    if (confirmed) {
      const pkgId = offer.id;
      console.log(MSISDN, pkgId);
      const email = localStorage.getItem("email");
      const saleType = "Activation"
      const response = axios.post(`http://localhost:8000/api/v1/users/activate`, { MSISDN, pkgId });
      const operationId = pkgId;
      const test = axios.put(`http://localhost:8000/api/v1/employees/sale`, { email, MSISDN, operationId, saleType });
      console.log(test);


    }

  };
  {return (
    <div className="offer">
      <p className='red-text'><strong>{offer.commercialName} </strong></p>
      <p className='black-text'> Pour <strong>{offer.price} D.A</strong> et pour <strong>{offer.duration} jours</strong></p>
      <p className='black-text'><strong>{offer.data}Go</strong> + <strong>{offer.voiceOffnet} D.A</strong> vers tous les réseaux</p>
      {offer.voiceOnnet === 44640 && offer.SMS === 99999 && <p className='black-text'> <strong>Appels et SMS illimités </strong> vers Djezzy</p>}
      <button className="activate-button" onClick={handleActivateOffer}>Activer</button>
    </div>
  );}
};

export default Offer;
