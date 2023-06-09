import axios from "axios";
import { useState, useEffect } from "react";

export const Plaintes = ({plaintes}) => {
    if (plaintes && plaintes.length > 0) {
      return(
        <div>
            {plaintes.map((plainte) => (
                  <div style={{ border: "1px solid black" ,borderRadius:"10px", backgroundColor: "white"}}>
                    <h1>{plainte.dateReclamation}</h1>
                    <h2>{plainte.fullName}</h2>
                    <p>{plainte.reclamationText}</p>
                  </div>
                ))}
        </div>);
    }

    return(<div>
      
    </div>);
}