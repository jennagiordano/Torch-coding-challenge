import React from "react";
import { connect } from "react-redux";
import {
  fetchSubways,
  removeSubway,
  postNewSubway,
  sortByName,
  sortByNumberOfStudents,
  filterSubwaysWithNoStudents,
} from "../redux/subways";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

// Notice that we're exporting the AllSubways component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllSubways extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      showFilterSubwaysButton: true,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sortByInput = this.sortByInput.bind(this);
    this.filterSubwaysWithNoStudents = this.filterSubwaysWithNoStudents.bind(
      this
    );
    this.showFilterSubwaysButton = this.showFilterSubwaysButton.bind(this);
  }
  componentDidMount() {
    try {
      this.props.getSubways();
    } catch (error) {
      this.setState({
        hasError: error,
      });
    }
  }

  handleDelete(e) {
    this.props.deleteSubway(e.target.value);
  }

  handleSubmit(formState) {
    this.props.post(formState);
  }

  filterSubwaysWithNoStudents() {
    this.props.filterSubwaysWithNoStudents();
    this.setState({
      showFilterSubwaysButton: false,
    });
  }

  showFilterSubwaysButton() {
    this.props.getSubways();
    this.setState({
      showFilterSubwaysButton: true,
    });
  }

  sortByInput(e) {
    let value = e.target.value;

    if (value.startsWith("Number")) {
      this.props.sortBySubwayNumberOfStudents();
    } else {
      this.props.sortBySubwayName();
    }
  }

  render() {
    const subways = this.props.subways || [];
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong. </h1>
        </div>
      );
    } else {
      return (
        <div className="componentContainer">
          <h2 className="center">Subways</h2>
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
              <option>Subway Name - A-Z</option>
            </select>
            {this.state.showFilterSubwaysButton ? (
              <button
                id="filterButton"
                type="submit"
                onClick={this.filterSubwaysWithNoStudents}
              >
                <FontAwesomeIcon icon={faFilter} /> Filter Subways With No
                Students
              </button>
            ) : (
              <button
                id="filterButton"
                type="submit"
                onClick={this.showFilterSubwaysButton}
              >
                <FontAwesomeIcon icon={faFilter} /> Show All Subways
              </button>
            )}
          </div>
          <hr />
          <div className="innerComponent">
            {subways.map((subway) => {
              return (
                <div key={subway ? subway.id : "x"} className="componentColumn">
                  {subway && (
                    <div className="subwayItem">
                      <div>
                        <a href={`/subways/${subway.id}`}>
                          <h4>{subway.name}</h4>
                          <img src={`${subway.imageUrl}`} />
                        </a>
                        <button
                          id="deleteButton"
                          value={subway.id}
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
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return { subways: state.subways };
};

const mapDispatch = (dispatch) => {
  return {
    getSubways: () => {
      return dispatch(fetchSubways());
    },
    deleteSubway: (id) => {
      return dispatch(removeSubway(id));
    },
    sortBySubwayName: () => {
      return dispatch(sortByName());
    },
    sortBySubwayNumberOfStudents: () => {
      return dispatch(sortByNumberOfStudents());
    },
    filterSubwaysWithNoStudents: () => {
      return dispatch(filterSubwaysWithNoStudents());
    },
    post: (newSubwayEntry) => dispatch(postNewSubway(newSubwayEntry)),
  };
};

export default connect(mapState, mapDispatch)(AllSubways);
