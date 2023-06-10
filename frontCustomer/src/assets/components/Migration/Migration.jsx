import React, { useState } from 'react';
import axios from 'axios';

export const Migration = ({ MSISDN, migration }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMigrate = async () => {
    setShowConfirmation(false);

    const subTypeId = migration.id;
    const response = await axios.post(
      'http://localhost:8000/api/v1/users/migrate',
      { MSISDN, subTypeId }
    );
    const email = localStorage.getItem("email");
    console.log(email);
    const saleType = "Migration"
    const operationId = "NULL";
    const test = axios.put(`http://localhost:8000/api/v1/employees/sale`, { email, MSISDN, operationId, saleType });
    console.log(test);
  };

  return (
    <div className="migration-box">
      <h2 className='migration-titre'>
        <strong>{migration.commercialName}</strong>
      </h2>
      <button className="activate-button" onClick={() => setShowConfirmation(true)}>
        Activer
      </button>

      {showConfirmation && (
        <div className="custom-modal">
          <div className="modal-content">
            <p>Êtes-vous sûr de vouloir migrer vers cet abonnement?</p>
            <div>
              <button onClick={handleMigrate}>Confirmer</button>
              <button onClick={() => setShowConfirmation(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
