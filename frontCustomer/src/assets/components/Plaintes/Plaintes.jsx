import axios from "axios";
import { useState, useEffect } from "react";

export const Plaintes = () => {

    const [plaintes, setPlaintes] = useState([]);

    useEffect(() => {
    const fetchPlaintes = async () => {
      try {
        const MSISDN = localStorage.getItem("MSISDN");
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/reclamations/${MSISDN}`
        );
        setPlaintes(response.data);
      } catch (error) {
        console.error("Error fetching plaintes:", error);
      }
    };

    fetchPlaintes();
     }, []);
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