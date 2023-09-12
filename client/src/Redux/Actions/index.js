import axios from "axios";
import {
  FILTERS,
  FILTER_TEAM,
  GET_ALL_DRIVERS,
  GET_ALL_TEAMS,
  GET_DRIVER_BY_ID,
  CLEAN_STATE,
  GET_DRIVER_BY_NAME,
  CLEAN_STATE_NAME,
} from "../ActionTypes/index";

export function postNewDriver(info) {
  return async function () {
    try {
      const response = await axios.post("http://localhost:3001/drivers", {
        name: info.name,
        surname: info.surname,
        description: info.description,
        nationality: info.nationality,
        dob: info.dob,
        image: info.image,
        teamId: info.teams,
      });
      console.log(response);
      alert(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
}
export function getAllTeams() {
  return async function (dispatch) {
    try {
      const allTeams = (await axios.get("http://localhost:3001/teams/")).data;
      return dispatch({
        type: GET_ALL_TEAMS,
        payload: allTeams,
      });
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };
}

export function getAllDrivers() {
  return async function (dispatch) {
    try {
      const result = (await axios.get("http://localhost:3001/drivers/")).data;
      return dispatch({
        type: GET_ALL_DRIVERS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      alert(
        /* error.message */
        "An error ocurred when requiring all the drivers"
      );
    }
  };
}

export function filter(orden) {
  return function (dispatch) {
    return dispatch({
      type: FILTERS,
      payload: orden,
    });
  };
}

export function filterByTeam(value, filterType) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_TEAM,
      payload: { value, filterType },
    });
  };
}

export function getDriverById(id) {
  return async function (dispatch) {
    try {
      const result = (await axios.get(`http://localhost:3001/drivers/${id}`))
        .data;
      if (!result.image) {
        result.image = "defaultImage.jpg";
      }
      return dispatch({
        type: GET_DRIVER_BY_ID,
        payload: result,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
}

export function cleanState() {
  return function (dispatch) {
    return dispatch({
      type: CLEAN_STATE,
    });
  };
}

export function getDriverByName(searchBar) {
  return async function (dispatch) {
    try {
      const result = (
        await axios.get(`http://localhost:3001/drivers/?name=${searchBar}`)
      ).data;
      console.log(result);
      return dispatch({
        type: GET_DRIVER_BY_NAME,
        payload: result,
      });
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };
}

export function cleanStateName() {
  return function (dispatch) {
    return dispatch({
      type: CLEAN_STATE_NAME,
    });
  };
}
