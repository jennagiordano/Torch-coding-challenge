import axios from "axios";
import { SET_SINGLE_CAMPUS, UPDATE_SINGLE_STUDENTS_CAMPUS } from "./index";

export const setSingleCampus = (campus) => {
  return {
    type: SET_SINGLE_CAMPUS,
    campus,
  };
};

export const updateSingleCampusStudents = (campus, studentId) => {
  return {
    type: UPDATE_SINGLE_STUDENTS_CAMPUS,
    campus,
    studentId,
  };
};

export const fetchSingleCampus = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/campuses/${id}`);
      dispatch(setSingleCampus(data));
      return true;
    } catch (error) {
      console.log("Single Campus Get Request Error: ", error);
    }
  };
};

export const updateSingleCampus = (id, body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/campuses/${id}`, body);
      dispatch(setSingleCampus(data));
    } catch (error) {
      console.log("Single Campus Put Request Error: ", error);
    }
  };
};

export const updateCampusStudents = (id, body, studentId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/campuses/${id}`, body);
      dispatch(updateSingleCampusStudents(data, studentId));
    } catch (error) {
      console.log("Single Campus Put Request Error: ", error);
    }
  };
};

const initialState = [];

const singleCampusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_CAMPUS:
      return action.campus;
    case UPDATE_SINGLE_STUDENTS_CAMPUS:
      action.campus.students = [
        ...action.campus.students.filter(
          (student) => student.id !== +action.studentId
        ),
      ];
      return action.campus;
    default:
      return state;
  }
};

export default singleCampusReducer;
