import { combineReducers } from "redux";
import campusesReducer from "./campuses";
import singleCampusReducer from "./singleCampus";

//set action creators
export const SET_CAMPUSES = "SET_CAMPUSES";
export const SET_SINGLE_CAMPUS = "SET_SINGLE_CAMPUS";

//get action creators
export const GOT_NEW_CAMPUS_FROM_SERVER = "GOT_NEW_CAMPUS_FROM_SERVER";

//delete action creators
export const REMOVE_CAMPUS = "REMOVE_CAMPUS";

//update action creators
export const UPDATE_SINGLE_STUDENTS_CAMPUS = "UPDATE_SINGLE_STUDENTS_CAMPUS";

//sort campus action creators
export const SORT_CAMPUS_BY_NUMBER_OF_STUDENTS =
  "SORT_CAMPUS_BY_NUMBER_OF_STUDENTS";
export const SORT_CAMPUS_BY_NAME = "SORT_CAMPUS_BY_NAME";

//filter campus action creators
export const FILTER_CAMPUSES_WITHOUT_STUDENTS =
  "FILTER_CAMPUSES_WITHOUT_STUDENTS";

const appReducer = combineReducers({
  campuses: campusesReducer,
  singleCampus: singleCampusReducer,
});

export default appReducer;
