import React from 'react'
import axios from 'axios'

export const Migration = () => {

    const handleMigrate = ({MSISDN, migration}) =>
    {
        const confirmed =  window.confirm("Etes vous sûr de vouloir migrer vers cet abonnement?");
        if (confirmed) {
            const subTypeId = migration;
            const response = axios.post(`http://localhost:8000/api/v1/users/migrate`, {MSISDN, subTypeId});
        }
    }

  return (
    <div>Migration</div>
  )
}
