import React from "react";
import { connect } from "react-redux";
import {
  fetchCampuses,
  removeCampus,
  postNewCampus,
  sortByName,
  sortByNumberOfStudents,
  filterCampusesWithNoStudents,
} from "../redux/campuses";
import NewCampusForm from "./NewCampusForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllCampuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      showFilterCampusesButton: true,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortByInput = this.sortByInput.bind(this);
    this.filterCampusesWithNoStudents = this.filterCampusesWithNoStudents.bind(
      this
    );
    this.showFilterCampusesButton = this.showFilterCampusesButton.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getCampuses();
    } catch (error) {
      this.setState({
        hasError: error,
      });
    }
  }

  handleDelete(e) {
    this.props.deleteCampus(e.target.value);
  }

  handleSubmit(formState) {
    this.props.post(formState);
  }

  filterCampusesWithNoStudents() {
    this.props.filterCampusesWithNoStudents();
    this.setState({
      showFilterCampusesButton: false,
    });
  }

  showFilterCampusesButton() {
    this.props.getCampuses();
    this.setState({
      showFilterCampusesButton: true,
    });
  }

  sortByInput(e) {
    let value = e.target.value;

    if (value.startsWith("Number")) {
      this.props.sortByCampusNumberOfStudents();
    } else {
      this.props.sortByCampusName();
    }
  }

  render() {
    const campuses = this.props.campuses || [];
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong. </h1>
        </div>
      );
    } else {
      return (
        <div className="componentContainer">
          <h2 className="center">Campuses</h2>
          <div>
            <select
              onChange={(e) => {
                this.sortByInput(e);
              }}
            >
              <option value="" disabled selected>
                Sort by
              </option>
              <option>Number of Students - Highest to Lowest</option>
              <option>Campus Name - A-Z</option>
            </select>
            {this.state.showFilterCampusesButton ? (
              <button
                id="filterButton"
                type="submit"
                onClick={this.filterCampusesWithNoStudents}
              >
                <FontAwesomeIcon icon={faFilter} /> Filter Campuses With No
                Students
              </button>
            ) : (
              <button
                id="filterButton"
                type="submit"
                onClick={this.showFilterCampusesButton}
              >
                <FontAwesomeIcon icon={faFilter} /> Show All Campuses
              </button>
            )}
          </div>
          <hr />
          <div className="innerComponent">
            {campuses.map((campus) => {
              return (
                <div key={campus ? campus.id : "x"} className="componentColumn">
                  {campus && (
                    <div className="campusItem">
                      <div>
                        <a href={`/campuses/${campus.id}`}>
                          <h4>{campus.name}</h4>
                          <img src={`${campus.imageUrl}`} />
                        </a>
                        <button
                          id="deleteButton"
                          value={campus.id}
                          type="submit"
                          onClick={this.handleDelete}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <hr />
          <div className="formContainer">
            <NewCampusForm handleSubmit={this.handleSubmit} />
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return { campuses: state.campuses };
};

const mapDispatch = (dispatch) => {
  return {
    getCampuses: () => {
      return dispatch(fetchCampuses());
    },
    deleteCampus: (id) => {
      return dispatch(removeCampus(id));
    },
    sortByCampusName: () => {
      return dispatch(sortByName());
    },
    sortByCampusNumberOfStudents: () => {
      return dispatch(sortByNumberOfStudents());
    },
    filterCampusesWithNoStudents: () => {
      return dispatch(filterCampusesWithNoStudents());
    },
    post: (newCampusEntry) => dispatch(postNewCampus(newCampusEntry)),
  };
};

export default connect(mapState, mapDispatch)(AllCampuses);
