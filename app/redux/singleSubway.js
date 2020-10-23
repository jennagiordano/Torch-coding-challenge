import axios from "axios";
import { SET_SINGLE_SUBWAY } from "./index";

export const setSingleSubway = (subway) => {
  return {
    type: SET_SINGLE_SUBWAY,
    subway,
  };
};

export const fetchSingleSubway = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/subways/${name}`);
      dispatch(setSingleSubway(data));
      return true;
    } catch (error) {
      console.log("Single Subway Get Request Error: ", error);
    }
  };
};

const initialState = [];

const singleSubwayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_SUBWAY:
      return action.subway;
    default:
      return state;
  }
};

export default singleSubwayReducer;
