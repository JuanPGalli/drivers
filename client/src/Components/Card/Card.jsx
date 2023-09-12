/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ id, name, surname, image, teams }) => {
  return (
    <div className="card-container">
      <Link to={`/detail/${id}`}>
        <div className="card-image">
          <img src={image} alt="driverApiImg" />
        </div>
      </Link>

      <div className="card-info">
        <h4>Name: {name}</h4>
        <h4>Surname: {surname}</h4>
        <h4>Teams: {teams}</h4>
      </div>
    </div>
  );
};

export default Card;
