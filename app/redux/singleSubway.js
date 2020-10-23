import axios from "axios";
import { SET_SINGLE_SUBWAY, UPDATE_SINGLE_STUDENTS_SUBWAY } from "./index";

export const setSingleSubway = (subway) => {
  return {
    type: SET_SINGLE_SUBWAY,
    subway,
  };
};

export const updateSingleSubwayStudents = (subway, studentId) => {
  return {
    type: UPDATE_SINGLE_STUDENTS_SUBWAY,
    subway,
    studentId,
  };
};

export const fetchSingleSubway = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/subways/${id}`);
      dispatch(setSingleSubway(data));
      return true;
    } catch (error) {
      console.log("Single Subway Get Request Error: ", error);
    }
  };
};

export const updateSingleSubway = (id, body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/subways/${id}`, body);
      dispatch(setSingleSubway(data));
    } catch (error) {
      console.log("Single Subway Put Request Error: ", error);
    }
  };
};

export const updateSubwayStudents = (id, body, studentId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/subways/${id}`, body);
      dispatch(updateSingleSubwayStudents(data, studentId));
    } catch (error) {
      console.log("Single Subway Put Request Error: ", error);
    }
  };
};

const initialState = [];

const singleSubwayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_SUBWAY:
      return action.subway;
    case UPDATE_SINGLE_STUDENTS_SUBWAY:
      action.subway.students = [
        ...action.subway.students.filter(
          (student) => student.id !== +action.studentId
        ),
      ];
      return action.subway;
    default:
      return state;
  }
};

export default singleSubwayReducer;
