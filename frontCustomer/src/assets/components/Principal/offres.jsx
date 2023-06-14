import {useState} from 'react';
import axios from 'axios';
const Offer = ({ offer, MSISDN }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleActivateOffer = async () => {
      setShowConfirmation(false);

      const pkgId = offer.id;
      console.log(MSISDN, pkgId);
      const email = localStorage.getItem("email");
      const saleType = "Activation"
      const response = await axios.post(`http://localhost:8000/api/v1/users/activate`, { MSISDN, pkgId });
      const operationId = pkgId;
      const test = axios.put(`http://localhost:8000/api/v1/employees/sale`, { email, MSISDN, operationId, saleType });
      console.log(test);

  };
  return (
    <div className="offer">
      <p className='red-text'><strong>{offer.commercialName} </strong></p>
      <p className='black-text'> Pour <strong>{offer.price} D.A</strong> et pour <strong>{offer.duration} jours</strong></p>
      <p className='black-text'>Vous avez <strong>{offer.data}Go</strong> {offer.voiceOffnet !== null && offer.voiceOffnet !== 0  ?  <span>+ <strong>{offer.voiceOffnet}</strong> D.A vers tous les réseaux</span> : ''}</p>
      {offer.voiceOnnet === 44640 && offer.SMS === 99999 && <p className='black-text'> <strong>Appels et SMS illimités </strong> vers Djezzy</p>}
      <button className="activate-button" onClick={ () => setShowConfirmation(true)}>Activer</button>

      {showConfirmation && (
        <div className="custom-modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir activer ce forfait?</p>
            <div>
              <button onClick={handleActivateOffer}>Confirmer</button>
              <button onClick={() => setShowConfirmation(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
