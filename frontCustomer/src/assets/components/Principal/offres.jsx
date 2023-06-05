import React from 'react';

const Offer = ({ offer, onActivateOffer }) => {
  const handleActivateOffer = () => {
    // Appeler la fonction onActivateOffer avec l'offre en tant que paramètre
    onActivateOffer(offer);
  };

  return (
    <div className="offer">
      <h3>{offer.title}</h3>
      <p>{offer.description}</p>
      <button onClick={handleActivateOffer}>Activer</button>
    </div>
  );
};

export default Offer;
