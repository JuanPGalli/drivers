import { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanStateName,
  filter,
  filterByTeam,
  getAllDrivers,
  getAllTeams,
  getDriverByName,
} from "../../Redux/Actions";

const Home = () => {
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 9;
  const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const driversFiltered = useSelector((state) => state.driversFiltered);
  const filters = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(0);

  const [items, setItems] = useState(
    [...allDrivers]?.splice(0, ITEMS_PER_PAGE)
  );
  const [itemsFiltered, setItemsFiltered] = useState(
    [...driversFiltered]?.splice(0, ITEMS_PER_PAGE)
  );
  const [searchBar, setSearchBar] = useState("");
  const driverByName = useSelector((state) => state.driverByName);
  const [hasCleanedState, setHasCleanedState] = useState(false);

  const nextPage = () => {
    if (filters) {
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= driversFiltered.length) return;
      setItemsFiltered(
        [...driversFiltered]?.splice(firstIndex, ITEMS_PER_PAGE)
      );
      setCurrentPage(next_page);
      return;
    } else if (driverByName.length > 0) {
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= driverByName.length) return;
      setItemsFiltered([...driverByName]?.splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(next_page);
      return;
    }
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (firstIndex >= allDrivers.length) return;
    setItems([...allDrivers]?.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(next_page);
  };
  const prevPage = () => {
    if (filters) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setItemsFiltered(
        [...driversFiltered]?.splice(firstIndex, ITEMS_PER_PAGE)
      );
      setCurrentPage(prev_page);
      return;
    } else if (driverByName.length > 0) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
      setItemsFiltered([...driverByName]?.splice(firstIndex, ITEMS_PER_PAGE));
      setCurrentPage(prev_page);
      return;
    }
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * ITEMS_PER_PAGE;
    if (prev_page < 0) return;
    setItems([...allDrivers]?.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prev_page);
  };

  useEffect(() => {
    dispatch(getAllDrivers());
    dispatch(getAllTeams());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOrd = (event) => {
    // setSearchBar(""); // Limpiar búsqueda SearchBar
    dispatch(filter(event.target.value));
  };

  const filterTeam = (event) => {
    // setSearchBar(""); // Limpiar búsqueda SearchBar
    console.log(event.target.value);
    dispatch(filterByTeam(event.target.value, "team"));
  };

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItems([...allDrivers]?.splice(0, ITEMS_PER_PAGE));
  }, [allDrivers]);

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...driversFiltered]?.splice(0, ITEMS_PER_PAGE));
  }, [driversFiltered]);

  const handleSearch = () => {
    if (searchBar.trim() === "") {
      alert("Invalid driver name");
      return;
    }
    dispatch(cleanStateName());
    dispatch(getDriverByName(searchBar));
    setCurrentPage(0); // Volver a la primera página
  };

  // useEffect(() => {
  //   if (driverByName.length > 0) {
  //     setItemsFiltered(driverByName);
  //     dispatch(cleanStateName());
  //     //setCurrentPage(0);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [driverByName]);

  useEffect(() => {
    dispatch(cleanStateName());
    setHasCleanedState(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  useEffect(() => {
    if (hasCleanedState) {
      setItemsFiltered([]);
      setHasCleanedState(false);
    }
  }, [hasCleanedState]);

  useEffect(() => {
    // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...driverByName]?.splice(0, ITEMS_PER_PAGE));
  }, [driverByName]);

  return (
    <div className="home-container">
      <div className="home-bar">
        <div className="home-searchBar">
          <input
            type="text"
            value={searchBar}
            onChange={(event) => setSearchBar(event.target.value)}
            placeholder="Search by driver name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="home-pagination">
          <button onClick={prevPage}>Prev</button>
          <button onClick={nextPage}>Next</button>
        </div>
        <div className="home-filters">
          <label>Teams Filter: </label>
          {console.log(driversFiltered)}
          <select onChange={filterTeam}>
            <option defaultChecked value="0">
              -
            </option>
            {allTeams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <label>Order and Filter by: </label>
          <select onChange={filterOrd} name="" id="">
            <option defaultChecked value="0">
              -
            </option>
            <option value="name asc">name asc</option>
            <option value="name dct">name dct</option>
            <option value="dob asc">dob asc</option>
            <option value="dob dct">dob dct</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
          </select>
        </div>
      </div>
      {driverByName.length > 0 ? (
        <Cards allDrivers={itemsFiltered} />
      ) : filters ? (
        <Cards allDrivers={itemsFiltered} />
      ) : (
        <Cards allDrivers={items} />
      )}
    </div>
  );
};

export default Home;
