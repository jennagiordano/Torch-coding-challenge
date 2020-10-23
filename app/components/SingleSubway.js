import React from "react";
import { connect } from "react-redux";
import {
  fetchSingleSubway,
  updateSingleSubway,
  updateSubwayStudents,
} from "../redux/singleSubway";
import { Link } from "react-router-dom";

export class SingleSubway extends React.Component {
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
    let singleSubwayResponse = await this.props.getSingleSubway(
      this.props.match.params.subwayId
    );
    if (singleSubwayResponse === true) {
      this.setState({
        renderForm: true,
        loading: false,
      });
    }
  }

  handleSubmit(subwayId, subwayData) {
    this.props.put(subwayId, subwayData);
  }

  unregisterStudent(e) {
    console.log("unregister");
  }

  render() {
    let singleSubway = this.props.singleSubway || [];
    let students = this.props.singleSubway.students || [];
    return (
      <div>
        {this.state.loading ? (
          <h1>Loading Subway....</h1>
        ) : (
          <div>
            {singleSubway.id ? (
              <div className="componentContainer singleSubwayContainer">
                <div id="singleSubway">
                  <h2>{singleSubway.name}</h2>
                  <img src={singleSubway.imageUrl} />
                  <h3>Subway Information</h3>
                  <p>{singleSubway.address}</p>
                  <p>{singleSubway.description}</p>
                </div>

                <div id="subwayStudents">
                  <h2>Students</h2>
                  {students.length > 0 ? (
                    <div>
                      {students.map((student) => {
                        return (
                          <div className="singleSubwayStudent" key={student.id}>
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
              </div>
            ) : (
              <h1>Sorry, Subway Does Not Exist.</h1>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return { singleSubway: state.singleSubway };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleSubway: (id) => {
      return dispatch(fetchSingleSubway(id));
    },
    put: (subwayId, subwayData) =>
      dispatch(updateSingleSubway(subwayId, subwayData)),
    updateSubwayStudents: (subwayId, subway, studentId) =>
      dispatch(updateSubwayStudents(subwayId, subway, studentId)),
  };
};

export default connect(mapState, mapDispatch)(SingleSubway);
