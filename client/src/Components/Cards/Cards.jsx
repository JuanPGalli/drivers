/* eslint-disable react/prop-types */

import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ allDrivers }) => {
  return (
    <div className="cards-container">
      {allDrivers.map((driver) => (
        <Card
          key={driver.id}
          id={driver.id}
          name={driver.name}
          surname={driver.surname}
          description={driver.description}
          image={driver.image}
          teams={driver.teams}
          nationality={driver.nationality}
          dob={driver.dob}
          created={driver.created}
        />
      ))}
    </div>
  );
};

export default Cards;
