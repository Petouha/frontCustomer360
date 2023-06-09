import React from 'react'
import axios from 'axios'

export const Migration = ({MSISDN, migration}) => {

    const handleMigrate = () =>
    {
        const confirmed =  window.confirm("Etes vous sûr de vouloir migrer vers cet abonnement?");
        if (confirmed) {
            const subTypeId = migration.id;
            const response = axios.post(`http://localhost:8000/api/v1/users/migrate`, {MSISDN, subTypeId});
            console.log(response);
        }
    }

  return (
    <div className='migration-box'>
      <h2><strong>{migration.commercialName} </strong></h2>
      <button className="activate-button" onClick={handleMigrate}>Activer</button>
    </div>
  )
}
