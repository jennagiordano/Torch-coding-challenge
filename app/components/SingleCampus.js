import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleCampus,
  updateSingleCampus,
  updateCampusStudents,
} from "../redux/singleCampus";
import { Link } from "react-router-dom";
import NewCampusForm from "./NewCampusForm";

export class SingleCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderForm: false,
      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unregisterStudent = this.unregisterStudent.bind(this);
  }
  async componentDidMount() {
    let singleCampusResponse = await this.props.getSingleCampus(
      this.props.match.params.campusId
    );
    if (singleCampusResponse === true) {
      this.setState({
        renderForm: true,
        loading: false,
      });
    }
  }

  handleSubmit(campusId, campusData) {
    this.props.put(campusId, campusData);
  }

  unregisterStudent(e) {
    console.log("unregister");
  }

  render() {
    let singleCampus = this.props.singleCampus || [];
    let students = this.props.singleCampus.students || [];
    return (
      <div>
        {this.state.loading ? (
          <h1>Loading Campus....</h1>
        ) : (
          <div>
            {singleCampus.id ? (
              <div className="componentContainer singleCampusContainer">
                <div id="singleCampus">
                  <h2>{singleCampus.name}</h2>
                  <img src={singleCampus.imageUrl} />
                  <h3>Campus Information</h3>
                  <p>{singleCampus.address}</p>
                  <p>{singleCampus.description}</p>
                </div>

                <div id="campusStudents">
                  <h2>Students</h2>
                  {students.length > 0 ? (
                    <div>
                      {students.map((student) => {
                        return (
                          <div className="singleCampusStudent" key={student.id}>
                            <Link to={`/students/${student.id}`}>
                              <p>
                                {student.firstName} {student.lastName}
                              </p>
                            </Link>
                            <button
                              type="submit"
                              id="unregisterButton"
                              onClick={this.unregisterStudent}
                              value={student.id}
                            >
                              Unregister
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>No students enrolled here yet.</p>
                  )}
                </div>

                {this.state.renderForm && (
                  <div className="formContainer">
                    <NewCampusForm
                      campus={singleCampus}
                      handleSubmit={this.handleSubmit}
                    />
                  </div>
                )}
              </div>
            ) : (
              <h1>Sorry, Campus Does Not Exist.</h1>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return { singleCampus: state.singleCampus };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleCampus: (id) => {
      return dispatch(fetchSingleCampus(id));
    },
    put: (campusId, campusData) =>
      dispatch(updateSingleCampus(campusId, campusData)),
    updateCampusStudents: (campusId, campus, studentId) =>
      dispatch(updateCampusStudents(campusId, campus, studentId)),
  };
};

export default connect(mapState, mapDispatch)(SingleCampus);
