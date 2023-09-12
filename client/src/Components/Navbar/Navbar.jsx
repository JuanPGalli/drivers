import { Link, useLocation } from "react-router-dom";
import f1Logo from "./Logo-f1.png";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="nav-container">
      <div className="img-container">
        <Link to={"/"}>
          <img src={f1Logo} alt="formula1Logo" />
        </Link>
      </div>
      <div className="link-container">
        {location.pathname !== "/home" && <Link to={"/home"}>HOME</Link>}

        {location.pathname !== "/" && location.pathname !== "/create" && (
          <Link to={"/create"}>CREATE DRIVER</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
