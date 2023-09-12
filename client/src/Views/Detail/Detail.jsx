import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanState, getDriverById } from "../../Redux/Actions";
import loader from "./spinning-loading.gif";
//import Img from "./defaultImage.jpg";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const driverById = useSelector((state) => state.driverById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriverById(id));

    dispatch(cleanState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="card-container-detail">
      <div className="card-image-detail">
        {driverById?.image ? (
          <div>
            <img src={driverById?.image} alt={driverById?.name} />
          </div>
        ) : (
          <div>
            <img src={loader} alt="Loading" />
          </div>
        )}
      </div>
      <div className="card-info-detail">
        <h4>ID: {driverById?.id}</h4>
        <h4>Name: {driverById?.name}</h4>
        <h4>Surname: {driverById?.surname}</h4>
        <h4>Nationality: {driverById?.nationality}</h4>
        <h4>Description: {driverById?.description}</h4>
        <h4>Date of Birth: {driverById?.dob}</h4>
        {<h4>Teams: {driverById?.teams}</h4>}
      </div>
    </div>
  );
};

export default Detail;
