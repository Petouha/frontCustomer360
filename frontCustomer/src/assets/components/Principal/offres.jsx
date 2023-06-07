import React from 'react';
import axios from 'axios';
const Offer = ({ offer, MSISDN }) => {
  const handleActivateOffer = () => {
    // Appeler la fonction onActivateOffer avec l'offre en tant que paramètre
    const confirmed = window.confirm("Are you sure you want to activate this package?");
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

  return (
    <div className="offer">
      <p><strong>{offer.commercialName} </strong></p>
      <p> Pour {offer.price} D.A et pour {offer.duration} jours</p>
      <p>{offer.data}Go + {offer.voiceOffnet} D.A vers tous les réseaux</p>
      {offer.voiceOnnet == 44640 && offer.SMS == 99999 ? <p>Appels et SMS illimités vers Djezzy</p> : <p></p>}
      <button className="activate-button" onClick={handleActivateOffer}>Activer</button>
    </div>
  );
};

export default Offer;
