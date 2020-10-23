import { combineReducers } from "redux";
import subwaysReducer from "./subways";
import singleSubwayReducer from "./singleSubway";

//set action creators
export const SET_SUBWAYS = "SET_SUBWAYS";
export const SET_SINGLE_SUBWAY = "SET_SINGLE_SUBWAY";

//get action creators
export const GOT_NEW_SUBWAY_FROM_SERVER = "GOT_NEW_SUBWAY_FROM_SERVER";

//delete action creators
export const REMOVE_SUBWAY = "REMOVE_SUBWAY";

//update action creators
export const UPDATE_SINGLE_STUDENTS_SUBWAY = "UPDATE_SINGLE_STUDENTS_SUBWAY";

//sort subway action creators
export const SORT_SUBWAY_BY_NUMBER_OF_STUDENTS =
  "SORT_SUBWAY_BY_NUMBER_OF_STUDENTS";
export const SORT_SUBWAY_BY_NAME = "SORT_SUBWAY_BY_NAME";

//filter subway action creators
export const FILTER_SUBWAYS_WITHOUT_STUDENTS =
  "FILTER_SUBWAYS_WITHOUT_STUDENTS";

const appReducer = combineReducers({
  subways: subwaysReducer,
  singleSubway: singleSubwayReducer,
});

export default appReducer;
