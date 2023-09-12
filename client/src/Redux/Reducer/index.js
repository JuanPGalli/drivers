import {
  GET_ALL_TEAMS,
  GET_ALL_DRIVERS,
  FILTERS,
  FILTER_TEAM,
  GET_DRIVER_BY_ID,
  CLEAN_STATE,
  GET_DRIVER_BY_NAME,
  CLEAN_STATE_NAME,
} from "../ActionTypes";

let initialState = {
  allTeams: [],
  allDrivers: [],
  driversFiltered: [],
  filters: false,
  driverById: {},
  driverByName: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case GET_ALL_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
      };
    case FILTERS:
      if (action.payload === "name asc") {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].sort((prev, next) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      } else if (action.payload === "name dct") {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      } else if (action.payload === "dob asc") {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].sort((a, b) => {
            const aStart = parseInt(a.dob);
            const bStart = parseInt(b.dob);
            // Manejo de NaN: Reemplazar NaN con 0 para la comparación
            const aStartValue = isNaN(aStart) ? 0 : aStart;
            const bStartValue = isNaN(bStart) ? 0 : bStart;
            return aStartValue - bStartValue;
          }),
        };
      } else if (action.payload === "dob dct") {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].sort((a, b) => {
            const aStart = parseInt(a.dob);
            const bStart = parseInt(b.dob);
            // Manejo de NaN: Reemplazar NaN con 0 para la comparación
            const aStartValue = isNaN(aStart) ? 0 : aStart;
            const bStartValue = isNaN(bStart) ? 0 : bStart;

            return bStartValue - aStartValue;
          }),
        };
      } else if (action.payload === "API") {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].filter(
            (driver) => driver.created === false
          ),
        };
      } else if (action.payload === "DB") {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].filter(
            (driver) => driver.created === true
          ),
        };
      } else if (action.payload === "0") {
        return {
          ...state,
          filters: false,
        };
      }
      break;
    case FILTER_TEAM:
      if (
        action.payload.filterType === "team" &&
        action.payload.value !== "0"
      ) {
        return {
          ...state,
          filters: true,
          driversFiltered: [...state.allDrivers].filter(
            (driver) =>
              driver.teams && driver.teams.includes(action.payload.value)
          ),
        };
      } else if (
        action.payload.filterType === "team" &&
        action.payload.value === "0"
      ) {
        return {
          ...state,
          filters: false,
        };
      }
      break;

    case GET_DRIVER_BY_ID:
      return {
        ...state,
        driverById: action.payload,
      };

    case CLEAN_STATE:
      return {
        ...state,
        driverById: {},
      };

    case GET_DRIVER_BY_NAME:
      return {
        ...state,
        driverByName: action.payload,
      };
    case CLEAN_STATE_NAME:
      console.log("Received results: Cleaning State");
      return {
        ...state,
        driverByName: [],
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
