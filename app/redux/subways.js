import axios from "axios";
import {
  SET_SUBWAYS,
  GOT_NEW_SUBWAY_FROM_SERVER,
  REMOVE_SUBWAY,
  SORT_SUBWAY_BY_NUMBER_OF_STUDENTS,
  SORT_SUBWAY_BY_NAME,
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

//removed subway
export const removedSubway = (subway) => {
  return {
    type: REMOVE_SUBWAY,
    subwayId: subway,
  };
};

//SORT functions
//sort by number of students
export const sortByNumberOfStudents = () => ({
  type: SORT_SUBWAY_BY_NUMBER_OF_STUDENTS,
});

//sort by subway name
export const sortByName = () => ({
  type: SORT_SUBWAY_BY_NAME,
});

//FILTER FUNCTIONS
//filter subways with no students
export const filterSubwaysWithNoStudents = () => ({
  type: FILTER_SUBWAYS_WITHOUT_STUDENTS,
});

//AXIOS REQUEST FUNCTIONS
//post Subway
export const postNewSubway = (subway) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/subways", subway);
      const newSubwayResponse = response.data;
      const action = gotNewSubwayFromServer(newSubwayResponse);
      dispatch(action);
    } catch (error) {
      console.log("Create New Subway Post Request Error: ", error);
    }
  };
};

//remove Subway
export const removeSubway = (subwayId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/subways/${subwayId}`);
      const action = removedSubway(subwayId);

      dispatch(action);
    } catch (error) {
      console.log("Remove Subway Request Error: ", error);
    }
  };
};

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
const initialState = [];

//subways reducer
const subwaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBWAYS:
      return action.subways;
    case GOT_NEW_SUBWAY_FROM_SERVER:
      return [...state, action.subway];
    case REMOVE_SUBWAY:
      return [...state.filter((subway) => subway.id !== +action.subwayId)];
    case SORT_SUBWAY_BY_NUMBER_OF_STUDENTS:
      return sortBySubwayNumberOfStudents([...state], "students");
    case SORT_SUBWAY_BY_NAME:
      return sortBySubwayName([...state]);
    case FILTER_SUBWAYS_WITHOUT_STUDENTS:
      return [...state.filter((subway) => subway.students.length === 0)];
    default:
      return state;
  }
};

export default subwaysReducer;

function sortBySubwayName(arr) {
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

function sortBySubwayNumberOfStudents(arr, field) {
  return arr.sort(function (a, b) {
    if (a[field].length < b[field].length) return 1;

    if (b[field].length < a[field].length) return -1;

    return 0;
  });
}
