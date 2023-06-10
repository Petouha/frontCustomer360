import axios from "axios";
import { useState, useEffect } from "react";
import './Plaintes.css'

export const Plaintes = ({ plaintes }) => {
  if (plaintes && plaintes.length > 0) {
    return (
      <div className="ff">

        
        <div className="plainte-container">
          {plaintes.map((plainte) => (
            <div className="plainte-item">
              <h1 className="text">{plainte.fullName}</h1>
              <h2 className="text-temp">{plainte.dateReclamation}</h2>

              <p className="text-rec">{plainte.reclamationText}</p>
            </div>
          ))}
        </div>
      </div>);
  }

  return (<div>

  </div>);
}

