import axios from "axios";
import { useState, useEffect } from "react";
import './Plaintes.css'

export const Plaintes = ({ plaintes }) => {
  if (plaintes && plaintes.length > 0) {
    return (
      <div className="plainte-container">
        {plaintes.map((plainte) => (
          <div className="plainte-item">
            <h1>{plainte.dateReclamation}</h1>
            <h2>{plainte.fullName}</h2>
            <p>{plainte.reclamationText}</p>
          </div>
        ))}
      </div>);
  }

  return (<div>

  </div>);
}

