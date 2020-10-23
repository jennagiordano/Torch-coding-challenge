import axios from "axios";
import {
  SET_CAMPUSES,
  GOT_NEW_CAMPUS_FROM_SERVER,
  REMOVE_CAMPUS,
  SORT_CAMPUS_BY_NUMBER_OF_STUDENTS,
  SORT_CAMPUS_BY_NAME,
  FILTER_CAMPUSES_WITHOUT_STUDENTS,
} from "./index";

//ACTION CREATOR FUNCTIONS

//set campuses
export const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses,
  };
};

//got new campus
export const gotNewCampusFromServer = (campus) => {
  return {
    type: GOT_NEW_CAMPUS_FROM_SERVER,
    campus,
  };
};

//removed campus
export const removedCampus = (campus) => {
  return {
    type: REMOVE_CAMPUS,
    campusId: campus,
  };
};

//SORT functions
//sort by number of students
export const sortByNumberOfStudents = () => ({
  type: SORT_CAMPUS_BY_NUMBER_OF_STUDENTS,
});

//sort by campus name
export const sortByName = () => ({
  type: SORT_CAMPUS_BY_NAME,
});

//FILTER FUNCTIONS
//filter campuses with no students
export const filterCampusesWithNoStudents = () => ({
  type: FILTER_CAMPUSES_WITHOUT_STUDENTS,
});

//AXIOS REQUEST FUNCTIONS
//post Campus
export const postNewCampus = (campus) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/campuses", campus);
      const newCampusResponse = response.data;
      const action = gotNewCampusFromServer(newCampusResponse);
      dispatch(action);
    } catch (error) {
      console.log("Create New Campus Post Request Error: ", error);
    }
  };
};

//remove Campus
export const removeCampus = (campusId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/campuses/${campusId}`);
      const action = removedCampus(campusId);

      dispatch(action);
    } catch (error) {
      console.log("Remove Campus Request Error: ", error);
    }
  };
};

//fetch Campus
export const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/campuses");
      dispatch(setCampuses(data));
    } catch (error) {
      console.log("Campuses Get Request Error: ", error);
    }
  };
};

//initial state
const initialState = [];

//campuses reducer
const campusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUSES:
      return action.campuses;
    case GOT_NEW_CAMPUS_FROM_SERVER:
      return [...state, action.campus];
    case REMOVE_CAMPUS:
      return [...state.filter((campus) => campus.id !== +action.campusId)];
    case SORT_CAMPUS_BY_NUMBER_OF_STUDENTS:
      return sortByCampusNumberOfStudents([...state], "students");
    case SORT_CAMPUS_BY_NAME:
      return sortByCampusName([...state]);
    case FILTER_CAMPUSES_WITHOUT_STUDENTS:
      return [...state.filter((campus) => campus.students.length === 0)];
    default:
      return state;
  }
};

export default campusesReducer;

function sortByCampusName(arr) {
  let names = [];
  arr.forEach((element) => {
    names.push(element.name);
  });

  names.sort();

  let sortedArray = [];

  for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].name === names[i]) {
        sortedArray.push(arr[j]);
      }
    }
  }
  return sortedArray;
}

function sortByCampusNumberOfStudents(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field].length < b[field].length) return 1;

    if (b[field].length < a[field].length) return -1;

    return 0;
  });
}
