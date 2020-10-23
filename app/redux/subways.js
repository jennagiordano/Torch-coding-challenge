import axios from "axios";
import {
  SET_SUBWAYS,
  GOT_NEW_SUBWAY_FROM_SERVER,
  FILTER_SUBWAYS_WITHOUT_STUDENTS,
} from "./index";

//ACTION CREATOR FUNCTIONS

//set subways
export const setSubways = (subways) => {
  return {
    type: SET_SUBWAYS,
    subways,
  };
};

//got new subway
export const gotNewSubwayFromServer = (subway) => {
  return {
    type: GOT_NEW_SUBWAY_FROM_SERVER,
    subway,
  };
};

//FILTER FUNCTIONS
//filter subways with no students
export const filterSubwaysWithNoStudents = () => ({
  type: FILTER_SUBWAYS_WITHOUT_STUDENTS,
});

//fetch Subway
export const fetchSubways = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/subways");
      dispatch(setSubways(data));
    } catch (error) {
      console.log("Subways Get Request Error: ", error);
    }
  };
};

//initial state
const initialState = { delayedSubways: [], notDelayedSubways: [] };

//subways reducer
const subwaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBWAYS:
      console.log("acion subways: ", action.subways);
      return {
        delayedSubways: [
          action.subways.filter((subway) => subway.status === "DELAYED"),
        ],
        notDelayedSubways: [
          action.subways.filter((subway) => subway.status !== "DELAYED"),
        ],
      };
    case GOT_NEW_SUBWAY_FROM_SERVER:
      return [...state, action.subway];
    case FILTER_SUBWAYS_WITHOUT_STUDENTS:
      return [...state.filter((subway) => subway.status === "DELAYED")];
    default:
      return state;
  }
};

export default subwaysReducer;
