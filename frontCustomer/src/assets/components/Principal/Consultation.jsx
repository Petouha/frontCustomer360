import SemiCircle from "../SemiCircle/SemiCircle";
import './principal.css';

export const Consultation = ({ conso, packages }) => {
  const calculatePercentageData = (element, packages) => {
    const currentData = element.remainingData;
    const originalData = packages.find((item) => item.id === element.id).data;
    return (currentData * 100) / originalData;
  };
  const calculatePercentageOffnet = (element, packages) => {
    const currentData = element.remainingOffnet;
    const originalData = packages.find((item) => item.id === element.id).voiceOffnet;
    return (currentData * 100) / originalData;
  };

  if (conso && conso.length > 0 && packages) {
    return (
      <div className="consumption">
        {conso.map((element) => (
          <div className="consumption-block">
            <h3>
              {element.packageName} <br/>
              Jusqu'au {element.expirationDate}
            </h3>
            <h4>Data</h4>
            <SemiCircle
            key={element.id}
            percentage={calculatePercentageData(element, packages)}
            stroke="red"
            strokeWidth={3}
            diameter={75}/>
            <h4>Appels <br/>tous les réseaux</h4>
            <SemiCircle
            key={element.id}
            percentage={calculatePercentageOffnet(element, packages)}
            stroke="red"
            strokeWidth={3}
            diameter={75}/>
            {element.remainingOnnet === 44640 ? <p>Appels Illimités vers Djezzy</p> : null}
          </div>
        ))}
      </div>
    );
  }

  return (<h1 style={{ color: "red", textAlign: "center" }}>Aucun forfait n'est activé pour l'instant</h1>); // Return null or some fallback component when the data is not available
};
